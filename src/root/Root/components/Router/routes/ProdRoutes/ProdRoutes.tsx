import { Route } from 'react-router';
import {
    OnlyAuthorized,
    OnlyUnAuthorized,
    SuspenseWithGlobalLoader,
} from '../components';
import { Navigator } from '@features';
import { AppRoutes } from './AppRoutes';
import { LazyScreens } from '@screens/lazy';



export const ProdRoutes = () => {
    return (
        <Route path={Navigator.staticNavigatorPath.root}>
            <Route element={<OnlyAuthorized/>}>
                {AppRoutes({})}

                <Route
                    path={Navigator.staticNavigatorPath.invitation}
                    element={(
                        <SuspenseWithGlobalLoader>
                            <LazyScreens.InvitationScreen/>
                        </SuspenseWithGlobalLoader>
                    )}
                />
            </Route>

            <Route element={<OnlyUnAuthorized/>}>
                <Route
                    path={Navigator.staticNavigatorPath.auth}
                    element={(
                        <SuspenseWithGlobalLoader>
                            <LazyScreens.AuthScreen/>
                        </SuspenseWithGlobalLoader>
                    )}
                />
            </Route>
        </Route>
    );
};