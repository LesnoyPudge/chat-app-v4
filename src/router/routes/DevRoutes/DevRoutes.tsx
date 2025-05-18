import { ErrorScreenPure, GlobalLoaderScreen } from '@/router/screens/bundled';
import { noop } from '@lesnoypudge/utils';
import {
    InvitationScreenPure,
} from '@/router/screens/lazy/InvitationScreen/InvitationScreen';
import { Playground } from '@/playground';
import { AuthScreenPure } from '@/router/screens/lazy/AuthScreen/AuthScreen';
import { Outlet, Route } from 'react-router';
import { Dummies } from '@/fakeServer';
import { OnlyAuthorized } from '../components';
import { Navigator } from '@/features';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import type React from 'react';
import { GlobalLoader } from '@/root/components';



const pathNameToComponent = {
    [Navigator.navigatorDevPath.authScreen]: (
        <AuthScreenPure/>
    ),

    [Navigator.navigatorDevPath.errorScreen]: (
        <ErrorScreenPure onClick={noop}/>
    ),

    [Navigator.navigatorDevPath.globalLoaderScreen]: (
        <GlobalLoaderScreen/>
    ),

    [Navigator.navigatorDevPath.invitationScreen]: (
        <InvitationScreenPure
            server={Dummies.server({
                id: '',
                name: 'server name',
                avatar: null,
                identifier: '',
                owner: '',
                channels: [],
                members: [],
                roles: [],
                banned: [],
            })}
            isLoading={false}
            acceptInvitation={noop}
        />
    ),

    [Navigator.navigatorDevPath.playground]: (
        <Playground/>
    ),

    [Navigator.navigatorDevPath.playgroundAuthorized]: (
        <Playground/>
    ),
} satisfies Record<
    T.ValueOf<typeof Navigator.navigatorDevPath>,
    React.JSX.Element
>;

const DevElements = Object.values(Navigator.navigatorDevPath).map((path) => {
    if (path === Navigator.navigatorDevPath.playgroundAuthorized) {
        return (
            <Route
                key={path}
                path={path}
                element={<OnlyAuthorized/>}
            >
                <Route
                    index
                    element={pathNameToComponent[path]}
                />
            </Route>
        );
    }

    return (
        <Route
            key={path}
            path={path}
            element={pathNameToComponent[path]}
        />
    );
});

export const DevRoutes = () => {
    return (
        <Route element={(
            <GlobalLoader.Disable>
                <Outlet/>
            </GlobalLoader.Disable>
        )}>
            {DevElements}
        </Route>
    );
};