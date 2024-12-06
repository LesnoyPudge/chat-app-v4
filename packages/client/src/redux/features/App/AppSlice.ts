import { combinedFunction } from '@lesnoypudge/utils';
import { addEventListener } from '@lesnoypudge/utils-web';
import { RootState } from '@redux/store';
import { createCustomSlice, listenerMiddleware } from '@redux/utils';
import { Store } from '@reduxjs/toolkit';
import { localStorageApi } from '@utils';
import { MOBILE_SCREEN_QUERY } from '@vars';
import { noop } from 'motion';



export namespace App {
    export type State = {
        isInitialized: boolean;
        isRefreshing: boolean;
        isNetworkConnected: boolean;
        isSocketConnected: boolean;
        isMute: boolean;
        isDeaf: boolean;
        isMobileScreen: boolean;
    };

    export const getInitialState = (): State => {
        return {
            isDeaf: localStorageApi.get('isDeaf', false),
            isMute: localStorageApi.get('isMute', false),
            isInitialized: false,
            isMobileScreen: window.matchMedia(MOBILE_SCREEN_QUERY).matches,
            isNetworkConnected: navigator.onLine,
            isRefreshing: false,
            isSocketConnected: false,
        };
    };

    export const Slice = createCustomSlice({
        name: 'AppSlice',
        initialState: getInitialState(),
        reducers: (create) => ({
            initEffects: create.reducer(noop),

            softReset: create.reducer((state) => ({
                ...getInitialState(),
                isInitialized: state.isInitialized,
            })),
        }),
    });

    export const setupEffects = (store: Store<RootState>) => {
        const cleanup = combinedFunction(
            listenerMiddleware.startListening({
                actionCreator: Slice.actions.initEffects,
                effect: (_, api) => {
                    const mediaQuery = window.matchMedia(MOBILE_SCREEN_QUERY);

                    const handle = (e: MediaQueryListEvent) => {
                        // api.dispatch(Slice.actions.setIsMobile(e.matches));
                    };

                    mediaQuery.addEventListener('change', handle);

                    addEventListener(window, 'online', () => {
                        // api.dispatch(Slice.actions.setIsInternetConnected(true));
                    });

                    addEventListener(window, 'offline', () => {
                        // api.dispatch(Slice.actions.setIsInternetConnected(false));
                    });

                    // return () => mediaQuery.removeEventListener('change', handle)
                },
            }),

            listenerMiddleware.startListening({
                actionCreator: Slice.actions.softReset,
                effect: () => {
                    localStorageApi.remove('isDeaf');
                    localStorageApi.remove('isMute');
                    // localStorageApi.remove('lastVisitedChannels');
                    // localStorageApi.remove('savedMessageDrafts');
                },
            }),
        );

        store.dispatch(Slice.actions.initEffects());

        return cleanup;
    };
}