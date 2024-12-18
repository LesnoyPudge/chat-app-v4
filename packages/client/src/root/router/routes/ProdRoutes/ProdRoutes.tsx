import { Route } from 'react-router';
import { OnlyAuthorized, OnlyUnAuthorized } from '../components/index.ts';
import { withDelay } from '../utils/index.ts';
import { Navigator } from '@entities';
import { GlobalLoader } from '@root/GlobalLoader';
import { FC, lazy, Suspense } from 'react';
import { createSleep } from '@utils';



const InvitationScreen = lazy(withDelay(() => {
    return import('./lazy/InvitationScreen.ts');
}));

const AuthScreen = lazy(withDelay(() => {
    return import('./lazy/AuthScreen.ts');
}));

const Sleep = createSleep(1_000);

export const ProdRoutes: FC = () => {
    return (
        <Route path={Navigator.staticNavigatorPath.root}>
            <Route element={<OnlyAuthorized/>}>
                <Route
                    index
                    element={(
                        <Suspense fallback={<GlobalLoader.Enable/>}>
                            <GlobalLoader.Disable>
                                <Sleep>
                                    <>index page</>
                                </Sleep>
                            </GlobalLoader.Disable>
                        </Suspense>
                    )}
                />
                <Route
                    path={Navigator.staticNavigatorPath.invitation}
                    element={(
                        <Suspense fallback={<GlobalLoader.Enable/>}>
                            <GlobalLoader.Disable>
                                <InvitationScreen/>
                            </GlobalLoader.Disable>
                        </Suspense>
                    )}
                />
            </Route>

            <Route element={<OnlyUnAuthorized/>}>
                <Route
                    path={Navigator.staticNavigatorPath.auth}
                    element={(
                        <Suspense fallback={<GlobalLoader.Enable/>}>
                            <GlobalLoader.Disable>
                                <AuthScreen/>
                            </GlobalLoader.Disable>
                        </Suspense>
                    )}
                />
            </Route>
        </Route>
    );
};