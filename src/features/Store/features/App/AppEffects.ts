import { createEffects } from '@/store/utils';
import { AppSlice } from './AppSlice';
import { MOBILE_SCREEN_QUERY } from '@/vars';
import { addEventListener } from '@lesnoypudge/utils-web';
import { localStorageApi } from '@/utils';
import { socket } from '@/fakeSocket';
import { globalActions } from '@/store/globalActions';
import { Users } from '@/store/features';
import { ReduxToolkit } from '@/libs';



export const AppEffects = createEffects({
    effects: ({ dispatch, subscribe, getState }) => [
        (() => {
            return subscribe(() => {
                const state = getState();
                const currentUserId = state.App.userId;
                if (!currentUserId) return;

                const user = state.Users.entities[currentUserId];
                if (!user) return;

                localStorageApi.set(
                    'messageDisplayMode',
                    user.settings.messageDisplayMode,
                );
                localStorageApi.set(
                    'messageFontSize',
                    user.settings.messageFontSize,
                );
                localStorageApi.set(
                    'messageGroupSpacing',
                    user.settings.messageGroupSpacing,
                );
                localStorageApi.set(
                    'theme',
                    user.settings.theme,
                );
            });
        })(),

        (() => {
            const mediaQuery = window.matchMedia(MOBILE_SCREEN_QUERY);

            const handleMediaQuery = (e: MediaQueryListEvent) => {
                dispatch(AppSlice.actions.setIsMobileScreen(e.matches));
            };

            mediaQuery.addEventListener('change', handleMediaQuery);

            return () => mediaQuery.removeEventListener(
                'change',
                handleMediaQuery,
            );
        })(),

        addEventListener(window, 'online', () => {
            dispatch(AppSlice.actions.setIsNetworkConnected(true));
        }),

        addEventListener(window, 'offline', () => {
            dispatch(AppSlice.actions.setIsNetworkConnected(false));
        }),
    ],

    listenerMiddlewares: [
        ({ startListening }) => startListening({
            actionCreator: globalActions.softReset,
            effect: () => {
                localStorageApi.removeSensitiveData();

                socket.disconnect();
                socket.removeOnAddData();
                socket.removeOnRemoveData();
            },
        }),

        ({ startListening }) => {
            const matcher = ReduxToolkit.isAnyOf(
                Users.Api.endpoints.UserLogin.matchFulfilled,
                Users.Api.endpoints.UserRegistration.matchFulfilled,
                Users.Api.endpoints.UserRefresh.matchFulfilled,
            );

            startListening({
                matcher,
                effect: ({ payload }, { dispatch }) => {
                    dispatch(
                        AppSlice.actions.setLastSuccessfulRefreshTimestamp(
                            Date.now(),
                        ),
                    );

                    localStorageApi.set(
                        'accessToken',
                        payload.userData.accessToken,
                    );
                    localStorageApi.set(
                        'refreshToken',
                        payload.userData.refreshToken,
                    );

                    socket.connect();

                    socket.onAddData((data) => {
                        dispatch(globalActions.addSocketData(data));
                    });

                    socket.onRemoveData((data) => {
                        dispatch(globalActions.removeSocketData(data));
                    });
                },
            });
        },
    ],
});