import { createEffects } from '@redux/utils';
import { Slice } from './AppSlice';
import { MOBILE_SCREEN_QUERY } from '@vars';
import { addEventListener } from '@lesnoypudge/utils-web';
import { localStorageApi } from '@utils';
import { User } from '../Users';
import { isAnyOf } from '@reduxjs/toolkit';



export const { setupEffects } = createEffects({
    effects: ({ dispatch }) => {
        const mediaQuery = window.matchMedia(MOBILE_SCREEN_QUERY);

        const handleMediaQuery = (e: MediaQueryListEvent) => {
            dispatch(Slice.actions.setIsMobileScreen(e.matches));
        };

        mediaQuery.addEventListener('change', handleMediaQuery);

        return [
            () => mediaQuery.removeEventListener(
                'change',
                handleMediaQuery,
            ),

            addEventListener(window, 'online', () => {
                dispatch(Slice.actions.setIsNetworkConnected(true));
            }),

            addEventListener(window, 'offline', () => {
                dispatch(Slice.actions.setIsNetworkConnected(false));
            }),
        ];
    },

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
            },
        }),

        ({ startListening }) => {
            const matcher = isAnyOf(
                User.Api.endpoints.login.matchFulfilled,
                User.Api.endpoints.registration.matchFulfilled,
                User.Api.endpoints.refresh.matchFulfilled,
            );

            startListening({
                matcher,
                effect: ({ payload }) => {
                    localStorageApi.set('accessToken', payload.accessToken);
                    localStorageApi.set('refreshToken', payload.refreshToken);
                },
            });
        },
    ],
});