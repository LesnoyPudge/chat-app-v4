import { AppTypes } from './AppTypes';
import { localStorageApi } from '@/utils';
import { MOBILE_SCREEN_QUERY } from '@/vars';
import { createSlice } from '@/store/utils';
import { ReduxToolkit } from '@/libs';
import { Users } from '@/store/features';



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
    reducers: (create) => ({
        softReset: create.reducer((state) => ({
            ...getInitialState(),
            isAttemptedToRefresh: state.isAttemptedToRefresh,
        })),
    }),
    extraReducers: (builder) => {
        builder.addMatcher(
            ReduxToolkit.isAnyOf(
                Users.Api.endpoints.login.matchPending,
                Users.Api.endpoints.registration.matchPending,
                Users.Api.endpoints.refresh.matchPending,
            ),
            (state) => {
                state.isRefreshing = true;
            },
        );
        builder.addMatcher(
            ReduxToolkit.isAnyOf(
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
            ReduxToolkit.isAnyOf(
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