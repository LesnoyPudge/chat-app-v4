import { Navigator } from '@entities';
import { Features } from '@redux/features';
import { useSliceSelector } from '@redux/hooks';
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router';



export const OnlyAuthorized: FC = () => {
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

    Features.User.Api.useRefreshQuery(
        undefined,
        { skip: isAttemptedToRefresh },
    );

    const notRefreshing = isAttemptedToRefresh && !isRefreshing;
    const shouldNavigateToAuth = notRefreshing && !isAuthorized;
    const shouldShowOutlet = notRefreshing && isAuthorized;

    useEffect(() => {
        if (!shouldNavigateToAuth) return;

        void navigateTo.auth({ replace: true });
    }, [navigateTo, shouldNavigateToAuth]);

    return (
        <If condition={shouldShowOutlet}>
            <Outlet/>
        </If>
    );
};