import { Navigator } from '@entities';
import { useLocalStorage } from '@hooks';
import { Features } from '@redux/features';
import { useSliceSelector } from '@redux/hooks';
import { env } from '@vars';
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
    const { refreshToken } = useLocalStorage('refreshToken');

    const skip = (
        disabled
        || isRefreshing
        || isAttemptedToRefresh
        || !refreshToken
    );

    Features.User.Api.useRefreshQuery({
        refreshToken: refreshToken ?? '',
    }, {
        skip,
        pollingInterval: Number.parseInt(env._PUBLIC_ACCESS_TOKEN_DURATION),
    });

    const shouldNotWait = isAttemptedToRefresh || !refreshToken;
    const notRefreshing = shouldNotWait && !isRefreshing;
    const shouldNavigateToAuth = notRefreshing && !isAuthorized;
    const shouldShowOutlet = notRefreshing && isAuthorized;

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