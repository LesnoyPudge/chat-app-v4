import { combinedFunction, invariant } from '@lesnoypudge/utils';
import { addEventListener } from '@lesnoypudge/utils-web';
import { RootState } from '@redux/store';
import { createCustomSlice, listenerMiddleware } from '@redux/utils';
import { Store, isAnyOf } from '@reduxjs/toolkit';
import { ClientEntities } from '@types';
import { localStorageApi } from '@utils';
import { MOBILE_SCREEN_QUERY } from '@vars';
import { noop } from 'motion';
import { User } from '../Users';



export namespace App {
    export type State = {
        user: ClientEntities.User.Base | null;
        isAttemptedToRefresh: boolean;
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
            isAttemptedToRefresh: false,
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
                isAttemptedToRefresh: state.isAttemptedToRefresh,
            })),
        }),
        extraReducers: (builder) => {
            builder.addMatcher(
                isAnyOf(
                    User.Api.endpoints.login.matchPending,
                    User.Api.endpoints.registration.matchPending,
                    User.Api.endpoints.refresh.matchPending,
                ),
                (state) => {
                    state.isRefreshing = true;
                },
            );
            builder.addMatcher(
                isAnyOf(
                    User.Api.endpoints.login.matchFulfilled,
                    User.Api.endpoints.registration.matchFulfilled,
                    User.Api.endpoints.refresh.matchFulfilled,
                ),
                (state, { payload }) => {
                    state.user = payload;
                    state.isRefreshing = false;
                    state.isAttemptedToRefresh = true;
                },
            );
            builder.addMatcher(
                isAnyOf(
                    User.Api.endpoints.login.matchRejected,
                    User.Api.endpoints.registration.matchRejected,
                    User.Api.endpoints.refresh.matchRejected,
                ),
                (state) => {
                    state.isRefreshing = false;
                    state.isAttemptedToRefresh = true;
                },
            );
        },
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
                    localStorageApi.remove('accessToken');
                    localStorageApi.remove('refreshToken');
                    // localStorageApi.remove('lastVisitedChannels');
                    // localStorageApi.remove('savedMessageDrafts');
                },
            }),

            listenerMiddleware.startListening({
                matcher: isAnyOf(
                    User.Api.endpoints.login.matchFulfilled,
                    User.Api.endpoints.registration.matchFulfilled,
                    User.Api.endpoints.refresh.matchFulfilled,
                ),
                effect: async (_, api) => {
                    const [{ payload }] = await api.take(isAnyOf(
                        User.Api.endpoints.login.matchFulfilled,
                        User.Api.endpoints.registration.matchFulfilled,
                        User.Api.endpoints.refresh.matchFulfilled,
                    ));

                    localStorageApi.set('accessToken', payload.accessToken);
                    localStorageApi.set('refreshToken', payload.refreshToken);
                },
            }),
        );

        dispatch(Slice.actions.initEffects());

        return cleanup;
    };
}