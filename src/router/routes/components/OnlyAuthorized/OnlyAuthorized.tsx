import { useLocalStorage } from '@/hooks';
import { env } from '@/vars';
import { FC, useEffect, useMemo } from 'react';
import { Outlet } from 'react-router';
import { hoursToMilliseconds, minutesToMilliseconds } from 'date-fns';
import { Navigator, Store } from '@/features';
import { createSleep, ErrorThrower } from '@lesnoypudge/utils-react';
import { SuspenseWithGlobalLoader } from '../SuspenseWithGlobalLoader';



export const OnlyAuthorized: FC = () => {
    const {
        isAttemptedToRefresh,
        lastSuccessfulRefreshTimestamp,
        isRefreshing,
        isAuthorized,
    } = Store.useSliceSelector(
        Store.App,
        ({
            isAttemptedToRefresh,
            lastSuccessfulRefreshTimestamp,
            isRefreshing,
            userId,
        }) => ({
            isAttemptedToRefresh,
            lastSuccessfulRefreshTimestamp,
            isRefreshing,
            isAuthorized: !!userId,
        }),
    );

    const { navigateTo } = Navigator.useNavigateTo();
    const { refreshToken } = useLocalStorage('refreshToken');

    // consider duration to be 2 min less then actual duration
    const tokenDuration = (
        Number.parseInt(env._PUBLIC_ACCESS_TOKEN_DURATION)
        - minutesToMilliseconds(2)
    );

    // it's time if now is more then duration minus minute
    const isItTimeToRefresh = (
        lastSuccessfulRefreshTimestamp === null
            ? true
            : Date.now() > (
                lastSuccessfulRefreshTimestamp
                + tokenDuration
                - minutesToMilliseconds(1)
            )
    );

    const haveRefreshToken = !!refreshToken.value;
    const skipRefresh = (
        isRefreshing
        || !isItTimeToRefresh
        || !haveRefreshToken
    );

    Store.Users.Api.useUserRefreshQuery({
        refreshToken: refreshToken.value ?? '',
        withData: true,
    }, {
        skip: skipRefresh,
        pollingInterval: tokenDuration,
        refetchOnReconnect: true,
    });

    const shouldNavigateToAuth = (
        // failed to refresh at least once and not refreshing now
        (isAttemptedToRefresh && !isAuthorized && !isRefreshing)
        //  or don't authorized and don't have refresh token
        || (!haveRefreshToken && !isAuthorized)
    );

    // we should show outlet during refreshing if it was shown once
    // if we refresh for the first time we don't show outlet while refreshing
    const shouldShowOutlet = (
        // show while refreshing if it was shown once
        (isAttemptedToRefresh && haveRefreshToken && isRefreshing)
        // if refresh is successful
        || (isAttemptedToRefresh && isAuthorized && !isRefreshing)
    );

    const shouldShowLoader = !shouldShowOutlet && !shouldNavigateToAuth;

    useEffect(() => {
        if (!shouldNavigateToAuth) return;

        navigateTo.auth({ replace: true });
    }, [navigateTo, shouldNavigateToAuth]);

    const Sleep = useMemo(() => createSleep(hoursToMilliseconds(12)), []);

    return (
        <>
            <If condition={shouldShowOutlet}>
                <Outlet/>
            </If>

            <If condition={shouldShowLoader}>
                <SuspenseWithGlobalLoader loaderId='OnlyAuthorized'>
                    <Sleep>
                        <ErrorThrower/>
                    </Sleep>
                </SuspenseWithGlobalLoader>
            </If>
        </>
    );
};