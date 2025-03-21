


export namespace AppTypes {
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
}