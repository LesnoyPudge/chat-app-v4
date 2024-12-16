import { ErrorScreenPure } from '@pages/screens/ErrorScreen';
import { noop } from '@lesnoypudge/utils';
import { InvitationScreenPure } from '@pages/screens/InvitationScreen';
import { GlobalLoaderScreen } from '@pages/screens/GlobalLoaderScreen';
import { Playground } from '@root/Playground';
import { AuthScreenPure } from '@pages/screens/AuthScreen';
import { FC, Suspense } from 'react';
import { Outlet, Route } from 'react-router';
import { GlobalLoader } from '@root/GlobalLoader';
import { createSleep } from '@utils';



const Sleep = createSleep(1_000);

export const DevRoutes: FC = () => {
    return (
        <Route
            path='/dev'
            element={(
                <Suspense>
                    <Sleep>
                        <GlobalLoader.Disable>
                            <Outlet/>
                        </GlobalLoader.Disable>
                    </Sleep>
                </Suspense>
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
                        channel={{
                            membersCount: 2,
                            name: 'fake channel',
                            onlineCount: 1,
                            avatarId: 'https://i.pravatar.cc/80',
                        }}
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