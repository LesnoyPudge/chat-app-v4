import { Route } from 'react-router';
import {
    OnlyAuthorized,
    OnlyUnAuthorized,
    SuspenseWithGlobalLoader,
} from '../components';
import { Navigator } from '@features';
import { AppRoutes } from './AppRoutes';
import { lazyLoad } from '@utils';



const InvitationScreen = lazyLoad.baseAsyncComponent(() => {
    return import('@screens/lazy/InvitationScreen');
});

const AuthScreen = lazyLoad.baseAsyncComponent(() => {
    return import('@screens/lazy/AuthScreen');
});

export const ProdRoutes = () => {
    return (
        <Route path={Navigator.staticNavigatorPath.root}>
            <Route element={<OnlyAuthorized/>}>
                {AppRoutes({})}

                <Route
                    path={Navigator.staticNavigatorPath.invitation}
                    element={(
                        <SuspenseWithGlobalLoader>
                            <InvitationScreen/>
                        </SuspenseWithGlobalLoader>
                    )}
                />
            </Route>

            <Route element={<OnlyUnAuthorized/>}>
                <Route
                    path={Navigator.staticNavigatorPath.auth}
                    element={(
                        <SuspenseWithGlobalLoader>
                            <AuthScreen/>
                        </SuspenseWithGlobalLoader>
                    )}
                />
            </Route>
        </Route>
    );
};