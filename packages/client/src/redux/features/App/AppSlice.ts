import { invariant } from '@lesnoypudge/utils';
import { createCustomSlice } from '@redux/utils';
import { isAnyOf } from '@reduxjs/toolkit';
import { ClientEntities } from '@types';
import { localStorageApi } from '@utils';
import { MOBILE_SCREEN_QUERY } from '@vars';
import { User } from '../Users';



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
                invariant(payload, 'empty user');
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