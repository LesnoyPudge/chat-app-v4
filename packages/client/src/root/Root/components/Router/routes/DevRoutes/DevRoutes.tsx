import { ErrorScreenPure, GlobalLoaderScreen } from '@screens/bundled';
import { noop } from '@lesnoypudge/utils';
import { InvitationScreenPure } from '@screens/lazy/InvitationScreen/InvitationScreen';
import { Playground } from './components';
import { AuthScreenPure } from '@screens/lazy/AuthScreen/AuthScreen';
import { Outlet, Route } from 'react-router';
import { createSleep } from '@utils';
import { Dummies } from '@fakeServer';
import { SuspenseWithGlobalLoader } from '../components';
import { FC, PropsWithChildren } from 'react';



const Sleep = createSleep(1_000);

const Test: FC<PropsWithChildren> = ({ children }) => {
    console.log('test');
    return (
        <>
            {children}
        </>
    );
};

export const DevRoutes = () => {
    return (
        <Route
            path='/dev'
            element={(
                <SuspenseWithGlobalLoader>
                    <Sleep>
                        <Test>
                            <Outlet/>
                        </Test>
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
                            channels: [],
                            members: [],
                            roles: [],
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