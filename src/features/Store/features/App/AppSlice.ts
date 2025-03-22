import { AppTypes } from './AppTypes';
import { localStorageApi } from '@/utils';
import { MOBILE_SCREEN_QUERY } from '@/vars';
import { createSlice } from '@/store/utils';
import { ReduxToolkit } from '@/libs';
import { Users } from '@/store/features';
import { globalActions } from '@/store/globalActions';



const getInitialState = (): AppTypes.State => {
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

export const AppSlice = createSlice({
    name: 'App',
    getInitialState,
    extraReducers: (builder) => {
        builder.addCase(
            globalActions.softReset,
            (state) => {
                return {
                    ...getInitialState(),
                    isAttemptedToRefresh: state.isAttemptedToRefresh,
                };
            },
        );
        builder.addMatcher(
            ReduxToolkit.isAnyOf(
                Users.Api.endpoints.UserLogin.matchPending,
                Users.Api.endpoints.UserRegistration.matchPending,
                Users.Api.endpoints.UserRefresh.matchPending,
            ),
            (state) => {
                state.isRefreshing = true;
            },
        );
        builder.addMatcher(
            ReduxToolkit.isAnyOf(
                Users.Api.endpoints.UserLogin.matchFulfilled,
                Users.Api.endpoints.UserRegistration.matchFulfilled,
                Users.Api.endpoints.UserRefresh.matchFulfilled,
            ),
            (state, { payload }) => {
                state.userId = payload.userData.id;
                state.isRefreshing = false;
                state.isAttemptedToRefresh = true;
            },
        );
        builder.addMatcher(
            ReduxToolkit.isAnyOf(
                Users.Api.endpoints.UserLogin.matchRejected,
                Users.Api.endpoints.UserRegistration.matchRejected,
                Users.Api.endpoints.UserRefresh.matchRejected,
            ),
            (state) => {
                state.isRefreshing = false;
                state.isAttemptedToRefresh = true;
            },
        );
    },
});