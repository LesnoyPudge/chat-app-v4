import { Navigator } from '@entities';
import { useLocalStorage } from '@hooks';
import { Features } from '@redux/features';
import { useSliceSelector } from '@redux/hooks';
import { env } from '@vars';
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router';
import { SuspenseWithGlobalLoader } from '../SuspenseWithGlobalLoader';
import { createSleep } from '@utils';
import { hoursToMilliseconds, minutesToMilliseconds } from 'date-fns';
import { ErrorThrower } from '@components';



const Sleep = createSleep(hoursToMilliseconds(12), true);

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
        lastSuccessfulRefreshTimestamp,
        isRefreshing,
        isAuthorized,
    } = useSliceSelector(Features.App.Slice, ({
        isAttemptedToRefresh,
        isRefreshing,
        lastSuccessfulRefreshTimestamp,
        userId,
    }) => ({
        isAttemptedToRefresh,
        lastSuccessfulRefreshTimestamp,
        isRefreshing,
        isAuthorized: !!userId,
    }));
    const { navigateTo } = Navigator.useNavigator();
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

    const haveRefreshToken = !!refreshToken;
    const skipRefresh = (
        disabled
        || isRefreshing
        || !isItTimeToRefresh
        || !haveRefreshToken
    );

    Features.Users.Api.useRefreshQuery({
        refreshToken: refreshToken ?? '',
        withData: true,
    }, {
        skip: skipRefresh,
        pollingInterval: tokenDuration,
        refetchOnReconnect: true,
    });

    const shouldNavigateToAuth = (
        // tried to refresh at least once and not refreshing now
        (isAttemptedToRefresh && !isAuthorized && !isRefreshing)
        //  or don't have refresh token
        || !haveRefreshToken
    );

    // we should show outlet during refreshing if it was shown once
    // if we refresh for the first time we don't show outlet while refreshing
    const shouldShowOutlet = (
        // show while refreshing if it was shown once
        (isAttemptedToRefresh && haveRefreshToken && isRefreshing)
        // if refresh is successful
        || (isAttemptedToRefresh && isAuthorized && !isRefreshing)
    );

    const showLoader = !shouldShowOutlet && !shouldNavigateToAuth;

    useEffect(() => {
        if (disabled) return;
        if (!shouldNavigateToAuth) return;

        void navigateTo.auth({ replace: true });
    }, [disabled, navigateTo, shouldNavigateToAuth]);

    return (
        <>
            <If condition={shouldShowOutlet || disabled}>
                <Outlet/>
            </If>

            <If condition={showLoader}>
                <SuspenseWithGlobalLoader>
                    <Sleep>
                        <ErrorThrower/>
                    </Sleep>
                </SuspenseWithGlobalLoader>
            </If>
        </>
    );
};