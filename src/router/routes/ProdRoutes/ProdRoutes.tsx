import { Route } from 'react-router';
import {
    OnlyAuthorized,
    OnlyUnAuthorized,
    SuspenseWithGlobalLoader,
} from '../components';
import { Navigator } from '@/features';
import { AppRoutes } from '../AppRoutes';
import { LazyScreens } from '@/router/screens/lazy';



export const ProdRoutes = () => {
    return (
        <Route path={Navigator.staticNavigatorPath.root}>
            <Route element={<OnlyAuthorized/>}>
                {AppRoutes({})}

                <Route
                    path={Navigator.staticNavigatorPath.invitation}
                    element={(
                        <Navigator.ParamsProvider>
                            <SuspenseWithGlobalLoader
                                loaderId='InvitationScreen'
                            >
                                <LazyScreens.InvitationScreen/>
                            </SuspenseWithGlobalLoader>
                        </Navigator.ParamsProvider>
                    )}
                />
            </Route>

            <Route element={<OnlyUnAuthorized/>}>
                <Route
                    path={Navigator.staticNavigatorPath.auth}
                    element={(
                        <Navigator.ParamsProvider>
                            <SuspenseWithGlobalLoader loaderId='AuthScreen'>
                                <LazyScreens.AuthScreen/>
                            </SuspenseWithGlobalLoader>
                        </Navigator.ParamsProvider>
                    )}
                />
            </Route>
        </Route>
    );
};