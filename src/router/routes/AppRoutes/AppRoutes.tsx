import { FC } from 'react';
import { Route } from 'react-router';
import { Navigator } from '@/features';
import { LazyLayouts } from '@/router/layouts/lazy';
import { LazyPanels } from '@/router/panels';
import { SuspenseWithGlobalLoader } from '../components';



export const AppRoutes: FC = () => {
    return (
        <Route element={(
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
                            <Navigator.ParamsValidator preset='conversation'>
                                <LazyPanels.Conversation/>
                            </Navigator.ParamsValidator>
                        </Navigator.ParamsProvider>
                    )}
                />
            </Route>

            <Route
                path={Navigator.staticNavigatorPath.server}
                element={(
                    <Navigator.ParamsProvider>
                        <Navigator.ParamsValidator preset='server'>
                            <LazyLayouts.WithSecondaryNavigation>
                                <LazyPanels.ServerNavigation/>
                            </LazyLayouts.WithSecondaryNavigation>
                        </Navigator.ParamsValidator>
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
                            <Navigator.ParamsValidator preset='channel'>
                                <LazyPanels.Channel/>
                            </Navigator.ParamsValidator>
                        </Navigator.ParamsProvider>
                    )}
                />
            </Route>
        </Route>
    );
};