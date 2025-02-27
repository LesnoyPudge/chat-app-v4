import { ErrorScreenPure, GlobalLoaderScreen } from '@router/screens/bundled';
import { noop } from '@lesnoypudge/utils';
import {
    InvitationScreenPure,
} from '@router/screens/lazy/InvitationScreen/InvitationScreen';
import { Playground } from '@playground';
import { AuthScreenPure } from '@router/screens/lazy/AuthScreen/AuthScreen';
import { Route } from 'react-router';
import { Dummies } from '@fakeServer';
import { SuspenseWithGlobalLoader } from '../components';
import { createSleep } from '@lesnoypudge/utils-react';
import { Navigator } from '@features';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import React from 'react';



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
            })}
            acceptInvitation={noop}
        />
    ),

    [Navigator.navigatorDevPath.playground]: (
        <Playground/>
    ),
} satisfies Record<
    T.ValueOf<typeof Navigator.navigatorDevPath>,
    React.JSX.Element
>;

const Sleep = createSleep(1_000);

const DevElements = Object.values(Navigator.navigatorDevPath).map((path) => {
    return (
        <Route
            path={path}
            element={(
                <SuspenseWithGlobalLoader>
                    <Sleep>
                        {pathNameToComponent[path]}
                    </Sleep>
                </SuspenseWithGlobalLoader>
            )}
        />
    );
});

export const DevRoutes = () => {
    return (
        <Route>
            {DevElements}
        </Route>
    );
};