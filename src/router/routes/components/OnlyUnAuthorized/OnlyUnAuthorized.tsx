import { Navigator, Store } from '@/features';
import { useLocalStorage } from '@/hooks';
import { invariant } from '@lesnoypudge/utils';
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router';



export const OnlyUnAuthorized: FC = () => {
    const {
        isAuthorized,
    } = Store.useSliceSelector(
        Store.App,
        ({ userId }) => ({ isAuthorized: !!userId }),
    );
    const { navigateTo } = Navigator.useNavigateTo();
    const { refreshToken } = useLocalStorage('refreshToken');

    const shouldShowOutlet = !isAuthorized;
    const shouldNavigateToRoot = refreshToken.value && isAuthorized;

    invariant(shouldNavigateToRoot !== shouldShowOutlet);

    useEffect(() => {
        if (!shouldNavigateToRoot) return;
        console.log('navigate to root');
        navigateTo.root({ replace: true });
    }, [navigateTo, shouldNavigateToRoot]);

    return (
        <If condition={shouldShowOutlet}>
            <Outlet/>
        </If>
    );
};