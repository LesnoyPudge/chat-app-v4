import { Navigator } from '@entities';
import { Features } from '@redux/features';
import { useLocalStorage, useSliceSelector } from '@redux/hooks';
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router';



export namespace OnlyAuthorized {
    export type Props = {
        disabled?: boolean;
    };
}

export const OnlyAuthorized: FC<OnlyAuthorized.Props> = ({
    disabled = false,
}) => {
    const {
        isAttemptedToRefresh,
        isRefreshing,
        isAuthorized,
    } = useSliceSelector(Features.App.Slice, ({
        isAttemptedToRefresh,
        isRefreshing,
        user,
    }) => ({
        isAttemptedToRefresh,
        isRefreshing,
        isAuthorized: !!user,
    }));
    const { navigateTo } = Navigator.useNavigator();
    const [refresh] = Features.User.Api.useRefreshMutation();
    const { refreshToken } = useLocalStorage('refreshToken');

    const shouldNotWait = isAttemptedToRefresh || !refreshToken;
    const notRefreshing = shouldNotWait && !isRefreshing;
    const shouldNavigateToAuth = notRefreshing && !isAuthorized;
    const shouldShowOutlet = notRefreshing && isAuthorized;

    useEffect(() => {
        if (disabled) return;
        if (isAttemptedToRefresh) return;
        if (!refreshToken) return;

        void refresh({ refreshToken });
    }, [disabled, isAttemptedToRefresh, refresh, refreshToken]);

    useEffect(() => {
        if (disabled) return;
        if (!shouldNavigateToAuth) return;

        void navigateTo.auth({ replace: true });
    }, [disabled, navigateTo, shouldNavigateToAuth]);

    return (
        <If condition={shouldShowOutlet || disabled}>
            <Outlet/>
        </If>
    );
};