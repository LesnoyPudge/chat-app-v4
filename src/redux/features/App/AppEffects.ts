import { createEffects } from '@/redux/utils';
import { Slice } from './AppSlice';
import { MOBILE_SCREEN_QUERY } from '@/vars';
import { addEventListener } from '@lesnoypudge/utils-web';
import { localStorageApi } from '@/utils';
import { Users } from '../Users';
import { isAnyOf } from '@reduxjs/toolkit';
import { App } from '.';
import { socket } from '@/fakeSocket';
import { socketActions } from '@/redux/actions';
import { scenarios } from '@/fakeServer';



export const { setupEffects } = createEffects({
    effects: ({ dispatch }) => [
        (() => {
            const mediaQuery = window.matchMedia(MOBILE_SCREEN_QUERY);

            const handleMediaQuery = (e: MediaQueryListEvent) => {
                dispatch(Slice.actions.setIsMobileScreen(e.matches));
            };

            mediaQuery.addEventListener('change', handleMediaQuery);

            return () => mediaQuery.removeEventListener(
                'change',
                handleMediaQuery,
            );
        })(),

        addEventListener(window, 'online', () => {
            dispatch(Slice.actions.setIsNetworkConnected(true));
        }),

        addEventListener(window, 'offline', () => {
            dispatch(Slice.actions.setIsNetworkConnected(false));
        }),
    ],

    listenerMiddlewares: [
        ({ startListening }) => startListening({
            actionCreator: Slice.actions.softReset,
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
            const matcher = isAnyOf(
                Users.Api.endpoints.login.matchFulfilled,
                Users.Api.endpoints.registration.matchFulfilled,
                Users.Api.endpoints.refresh.matchFulfilled,
            );

            startListening({
                matcher,
                effect: ({ payload }, { dispatch }) => {
                    dispatch(
                        App.Slice.actions.setLastSuccessfulRefreshTimestamp(
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