import { Route, Routes } from 'react-router';
import {
    OnlyAuthorized,
    OnlyUnAuthorized,
    SuspenseWithGlobalLoader,
} from '../components';
import { withDelay } from '../utils';
import { Navigator } from '@entities';
import { lazy } from 'react';
import { AppRoutes } from './AppRoutes';



const InvitationScreen = lazy(withDelay(() => {
    return import('@screens/lazy/InvitationScreen');
}));

const AuthScreen = lazy(withDelay(() => {
    return import('@screens/lazy/AuthScreen');
}));

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