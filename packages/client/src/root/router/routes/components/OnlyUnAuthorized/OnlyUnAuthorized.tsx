import { Navigator } from '@entities';
import { Features } from '@redux/features';
import { useLocalStorage, useSliceSelector } from '@redux/hooks';
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router';



export namespace OnlyUnAuthorized {
    export type Props = {
        disabled?: boolean;
    };
}

export const OnlyUnAuthorized: FC<OnlyUnAuthorized.Props> = ({
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

    const shouldNotWait = isAttemptedToRefresh || !refreshToken;
    const notRefreshing = shouldNotWait && !isRefreshing;
    const shouldShowOutlet = notRefreshing && !isAuthorized;
    const shouldNavigateToRoot = notRefreshing && isAuthorized;

    useEffect(() => {
        if (disabled) return;
        if (!shouldNavigateToRoot) return;

        void navigateTo.root({ replace: true });
    }, [disabled, navigateTo, shouldNavigateToRoot]);

    return (
        <If condition={shouldShowOutlet || disabled}>
            <Outlet/>
        </If>
    );
};