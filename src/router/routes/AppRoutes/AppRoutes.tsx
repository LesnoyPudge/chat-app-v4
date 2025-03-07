import { FC } from 'react';
import { Route } from 'react-router';
import { SuspenseWithGlobalLoader } from '../components';
import { Navigator } from '@/features';
import { LazyLayouts } from '@/router/layouts/lazy';
import { LazyPanels } from '@/router/panels';



export const AppRoutes: FC = () => {
    return (
        <Route element={(
            <SuspenseWithGlobalLoader>
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
                        <>conversation</>
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
                    <LazyLayouts.WithSecondaryNavigation>
                        <LazyPanels.ServerNavigation/>
                    </LazyLayouts.WithSecondaryNavigation>
                )}
            >
                <Route
                    index
                    element={(
                        <>auto redirect or chose available channel</>

                        // <NavigateToRoom
                        //     loader={<>show room skeleton loader while deciding what room to join</>}
                        //     fallback={(
                        //         <Suspense fallback={<>show room skeleton loader while deciding what room to join</>}>
                        //             <GlobalLoader.Loaded>
                        //                 <NoRoomsSubPage/>
                        //             </GlobalLoader.Loaded>
                        //         </Suspense>
                        //     )}
                        // />
                    )}
                />

                <Route
                    path={Navigator.staticNavigatorPath.channel}
                    element={(
                        <>channel</>

                        // <Suspense fallback={<SubPageSkeleton/>}>
                        //     <GlobalLoader.Loaded>
                        //         <RoomSubPage/>
                        //     </GlobalLoader.Loaded>
                        // </Suspense>
                    )}
                />
            </Route>
        </Route>
    );
};