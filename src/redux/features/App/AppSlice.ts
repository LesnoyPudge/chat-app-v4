import { createCustomSlice } from '@/redux/utils';
import { isAnyOf } from '@reduxjs/toolkit';
import { localStorageApi } from '@/utils';
import { MOBILE_SCREEN_QUERY } from '@/vars';
import { Users } from '../Users';



export type State = {
    userId: string | null;
    isAttemptedToRefresh: boolean;
    isRefreshing: boolean;
    lastSuccessfulRefreshTimestamp: number | null;
    isNetworkConnected: boolean;
    isSocketConnected: boolean;
    isMute: boolean;
    isDeaf: boolean;
    isMobileScreen: boolean;
};

export const getInitialState = (): State => {
    return {
        userId: null,
        isDeaf: localStorageApi.get('isDeaf', false),
        isMute: localStorageApi.get('isMute', false),
        isAttemptedToRefresh: false,
        lastSuccessfulRefreshTimestamp: null,
        isMobileScreen: window.matchMedia(MOBILE_SCREEN_QUERY).matches,
        isNetworkConnected: navigator.onLine,
        isRefreshing: false,
        isSocketConnected: false,
    };
};

export const Slice = createCustomSlice({
    name: 'App',
    initialState: getInitialState(),
    reducers: (create) => ({
        softReset: create.reducer((state) => ({
            ...getInitialState(),
            isAttemptedToRefresh: state.isAttemptedToRefresh,
        })),
    }),
    extraReducers: (builder) => {
        builder.addMatcher(
            isAnyOf(
                Users.Api.endpoints.login.matchPending,
                Users.Api.endpoints.registration.matchPending,
                Users.Api.endpoints.refresh.matchPending,
            ),
            (state) => {
                state.isRefreshing = true;
            },
        );
        builder.addMatcher(
            isAnyOf(
                Users.Api.endpoints.login.matchFulfilled,
                Users.Api.endpoints.registration.matchFulfilled,
                Users.Api.endpoints.refresh.matchFulfilled,
            ),
            (state, { payload }) => {
                state.userId = payload.userData.id;
                state.isRefreshing = false;
                state.isAttemptedToRefresh = true;
            },
        );
        builder.addMatcher(
            isAnyOf(
                Users.Api.endpoints.login.matchRejected,
                Users.Api.endpoints.registration.matchRejected,
                Users.Api.endpoints.refresh.matchRejected,
            ),
            (state) => {
                state.isRefreshing = false;
                state.isAttemptedToRefresh = true;
            },
        );
    },
});