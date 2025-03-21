import { createEffects } from '@/store/utils';
import { AppSlice } from './AppSlice';
import { MOBILE_SCREEN_QUERY } from '@/vars';
import { addEventListener } from '@lesnoypudge/utils-web';
import { localStorageApi } from '@/utils';
import { socket } from '@/fakeSocket';
import { socketActions } from '@/store/globalActions';
import { Users } from '@/store/features';
import { ReduxToolkit } from '@/libs';



export const AppEffects = createEffects({
    effects: ({ dispatch }) => [
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
            actionCreator: AppSlice.actions.softReset,
            effect: () => {
                localStorageApi.remove('isDeaf');
                localStorageApi.remove('isMute');
                localStorageApi.remove('accessToken');
                localStorageApi.remove('refreshToken');
                // localStorageApi.remove('lastVisitedChannels');
                // localStorageApi.remove('savedMessageDrafts');

                socket.disconnect();

                socket.removeOnAddData();
                socket.removeOnRemoveData();
            },
        }),

        ({ startListening }) => {
            const matcher = ReduxToolkit.isAnyOf(
                Users.Api.endpoints.login.matchFulfilled,
                Users.Api.endpoints.registration.matchFulfilled,
                Users.Api.endpoints.refresh.matchFulfilled,
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
                        dispatch(socketActions.addSocketData(data));
                    });

                    socket.onRemoveData((data) => {
                        dispatch(socketActions.removeSocketData(data));
                    });
                },
            });
        },
    ],
});