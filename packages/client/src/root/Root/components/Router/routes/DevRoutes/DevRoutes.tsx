import { ErrorScreenPure } from '@screens/bundled/ErrorScreen';
import { noop } from '@lesnoypudge/utils';
import { InvitationScreenPure } from '@screens/lazy/InvitationScreen/InvitationScreen';
import { GlobalLoaderScreen } from '@screens/bundled/GlobalLoaderScreen';
import { Playground } from './components';
import { AuthScreenPure } from '@screens/lazy/AuthScreen/AuthScreen';
import { FC } from 'react';
import { Outlet, Route } from 'react-router';
import { createSleep } from '@utils';
import { Dummies } from '@fakeServer';
import { SuspenseWithGlobalLoader } from '../components';



const Sleep = createSleep(1_000);

export const DevRoutes = () => {
    return (
        <Route
            path='/dev'
            element={(
                <SuspenseWithGlobalLoader>
                    <Sleep>
                        <Outlet/>
                    </Sleep>
                </SuspenseWithGlobalLoader>
            )}
        >
            <Route
                index
                element={<Playground/>}
            />

            <Route
                path='error-screen'
                element={<ErrorScreenPure onClick={noop}/>}
            />

            <Route
                path='auth-screen'
                element={<AuthScreenPure/>}
            />

            <Route
                path='invitation-screen'
                element={(
                    <InvitationScreenPure
                        server={Dummies.server({
                            id: '',
                            name: 'server name',
                            avatar: null,
                            identifier: '',
                            owner: '',
                        })}
                        acceptInvitation={noop}
                    />
                )}
            />

            <Route
                path='global-loader-screen'
                element={<GlobalLoaderScreen/>}
            />
        </Route>
    );
};