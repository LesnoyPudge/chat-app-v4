import { Navigator } from '@features';
import { useLocalStorage } from '@hooks';
import { invariant } from '@lesnoypudge/utils';
import { Features } from '@redux/features';
import { useSliceSelector } from '@redux/hooks';
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router';



export const OnlyUnAuthorized: FC = () => {
    const {
        isAuthorized,
    } = useSliceSelector(Features.App.Slice, ({
        userId,
    }) => ({
        isAuthorized: !!userId,
    }));
    const { navigateTo } = Navigator.useNavigator();
    const { refreshToken } = useLocalStorage('refreshToken');

    const shouldShowOutlet = !isAuthorized;
    const shouldNavigateToRoot = refreshToken.value && isAuthorized;

    invariant(shouldNavigateToRoot !== shouldShowOutlet);

    useEffect(() => {
        if (!shouldNavigateToRoot) return;

        void navigateTo.root({ replace: true });
    }, [navigateTo, shouldNavigateToRoot]);

    return (
        <If condition={shouldShowOutlet}>
            <Outlet/>
        </If>
    );
};