import { Navigator } from '@entities';
import { Features } from '@redux/features';
import { useSliceSelector } from '@redux/hooks';
import { GlobalLoader } from '@root/GlobalLoader';
import { createSleep } from '@utils';
import { FC, Suspense, useEffect } from 'react';
import { Outlet } from 'react-router';



const Sleep = createSleep(Infinity);

export const OnlyUnAuthorized: FC = () => {
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
    const shouldShowOutlet = notRefreshing && !isAuthorized;
    const shouldNavigateToRoot = notRefreshing && isAuthorized;

    useEffect(() => {
        if (!shouldNavigateToRoot) return;

        void navigateTo.root({ replace: true });
    }, [navigateTo, shouldNavigateToRoot]);

    return (
        <>
            {/* <If condition={!shouldShowOutlet}>
                <Sleep/>
            </If> */}

            <If condition={shouldShowOutlet}>
                <Outlet/>
            </If>
        </>
    );
};