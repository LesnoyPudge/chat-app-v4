import { combinedFunction, invariant } from '@lesnoypudge/utils';
import { addEventListener } from '@lesnoypudge/utils-web';
import { RootState } from '@redux/store';
import { createCustomSlice, listenerMiddleware } from '@redux/utils';
import { Store } from '@reduxjs/toolkit';
import { ClientEntities } from '@types';
import { localStorageApi } from '@utils';
import { MOBILE_SCREEN_QUERY } from '@vars';
import { noop } from 'motion';



export namespace App {
    export type State = {
        user: ClientEntities.User.Base | null;
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
            user: null,
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
        selectors: {
            selectAuthorizedUser: (state) => {
                invariant(state.user, 'authorized user not found');

                return state.user;
            },
        },
    });

    export const setupEffects = ({
        dispatch,
    }: Store<RootState>) => {
        const mediaQuery = window.matchMedia(MOBILE_SCREEN_QUERY);

        const handleMediaQuery = (e: MediaQueryListEvent) => {
            dispatch(Slice.actions.setIsMobileScreen(e.matches));
        };

        mediaQuery.addEventListener('change', handleMediaQuery);

        const cleanup = combinedFunction(
            () => mediaQuery.removeEventListener('change', handleMediaQuery),

            addEventListener(window, 'online', () => {
                dispatch(Slice.actions.setIsNetworkConnected(true));
            }),

            addEventListener(window, 'offline', () => {
                dispatch(Slice.actions.setIsNetworkConnected(false));
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

        dispatch(Slice.actions.initEffects());

        return cleanup;
    };
}