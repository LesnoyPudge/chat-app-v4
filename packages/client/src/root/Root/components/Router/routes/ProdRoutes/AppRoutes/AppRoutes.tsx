import { FC, lazy } from 'react';
import { Outlet, Route } from 'react-router';
import { SuspenseWithGlobalLoader } from '../../components';
import { Navigator } from '@entities';
import { createGroupedLazyLoad, withDelay } from '../../utils';



const { withGroupedLazyLoad } = createGroupedLazyLoad();

const WithPrimaryNavigation = lazy(withGroupedLazyLoad(withDelay(() => {
    return import('@layouts/WithPrimaryNavigation');
})));

export const AppRoutes: FC = () => {
    return (
        <Route element={(
            <SuspenseWithGlobalLoader>
                <WithPrimaryNavigation/>
            </SuspenseWithGlobalLoader>
        )}>
            <Route element={<>with Conversations <Outlet/></>}>
                <Route
                    index
                    element={(
                        <>
                            <>index</>
                        </>
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
                element={<>with channel list <Outlet/></>}
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