import { AppSlice } from './AppSlice';



export const {
    selectIsAttemptedToRefresh,
    selectIsDeaf,
    selectIsMobileScreen,
    selectIsMute,
    selectIsNetworkConnected,
    selectIsRefreshing,
    selectIsSocketConnected,
    selectLastSuccessfulRefreshTimestamp,
    selectUserId,
} = AppSlice.selectors;