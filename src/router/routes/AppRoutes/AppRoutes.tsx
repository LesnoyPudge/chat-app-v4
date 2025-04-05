import { FC } from 'react';
import { Route } from 'react-router';
import { Navigator } from '@/features';
import { LazyLayouts } from '@/router/layouts/lazy';
import { LazyPanels } from '@/router/panels';
import { SuspenseWithGlobalLoader } from '../components';



export const AppRoutes: FC = () => {
    return (
        <Route element={(
            // since our components loaded all at once,
            // single suspense is enough
            <SuspenseWithGlobalLoader loaderId='App'>
                <LazyLayouts.WithPrimaryNavigation/>
            </SuspenseWithGlobalLoader>
        )}>
            <Route element={(
                <LazyLayouts.WithSecondaryNavigation>
                    <LazyPanels.ConversationNavigation/>
                </LazyLayouts.WithSecondaryNavigation>
            )}>
                <Route
                    index
                    element={<LazyPanels.Friends/>}
                />

                <Route
                    path={Navigator.staticNavigatorPath.conversation}
                    element={(
                        <Navigator.ParamsProvider>
                            <>conversation</>
                        </Navigator.ParamsProvider>
                        // <Suspense fallback={<SubPageSkeleton/>}>
                        //     <GlobalLoader.Loaded>
                        //         <PrivateChatSubPage/>
                        //     </GlobalLoader.Loaded>
                        // </Suspense>
                    )}
                />
            </Route>

            <Route
                path={Navigator.staticNavigatorPath.server}
                element={(
                    <Navigator.ParamsProvider>
                        <LazyLayouts.WithSecondaryNavigation>
                            <LazyPanels.ServerNavigation/>
                        </LazyLayouts.WithSecondaryNavigation>
                    </Navigator.ParamsProvider>
                )}
            >
                <Route
                    index
                    element={<LazyPanels.ChannelFinder/>}
                />

                <Route
                    path={Navigator.staticNavigatorPath.channel}
                    element={(
                        <Navigator.ParamsProvider>
                            <LazyPanels.Channel/>
                        </Navigator.ParamsProvider>
                    )}
                />
            </Route>
        </Route>
    );
};