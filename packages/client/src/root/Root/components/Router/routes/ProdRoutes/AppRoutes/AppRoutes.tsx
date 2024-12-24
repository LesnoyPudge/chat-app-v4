import { FC } from 'react';
import { Outlet, Route } from 'react-router';
import { SuspenseWithGlobalLoader } from '../../components';
import { Navigator } from '@entities';
import { WithPrimaryNavigation } from '@layouts';


// PRELOAD ALL LAYOUTS???
// OR PRELOAD ALL SKELETONS???
// OR DON'T USE SKELETONS???
// OR SKELETONS AS PART OF LAYOUT/PANEL, DURING FETCHING
// IN THIS CASE, WE NEED SOME SUSPENSE MANAGER WHERE WE CAN
// PRELOAD ALL SUSPENDED COMPONENTS ONCE ONE COMPONENT IS LOADED

export const AppRoutes: FC = () => {
    return (
        <Route element={<WithPrimaryNavigation/>}>
            <Route element={<>with Conversations <Outlet/></>}>
                <Route
                    index
                    element={(
                        <SuspenseWithGlobalLoader>
                            <>index</>
                        </SuspenseWithGlobalLoader>

                        // <Suspense fallback={<SubPageSkeleton/>}>
                        //     <GlobalLoader.Loaded>
                        //         <AppSubPage/>
                        //     </GlobalLoader.Loaded>
                        // </Suspense>
                    )}
                />

                <Route
                    path={Navigator.staticNavigatorPath.conversation}
                    element={(
                        <SuspenseWithGlobalLoader>
                            <>conversation</>
                        </SuspenseWithGlobalLoader>
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
                element={<>with channel list <Outlet/></>}
            >
                <Route
                    index
                    element={(
                        <SuspenseWithGlobalLoader>
                            <>auto redirect or chose available channel</>
                        </SuspenseWithGlobalLoader>

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
                        <SuspenseWithGlobalLoader>
                            <>channel</>
                        </SuspenseWithGlobalLoader>

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