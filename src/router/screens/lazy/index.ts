import { lazyLoad } from '@lesnoypudge/utils-react';



const load = lazyLoad.baseAsyncComponent;

export const LazyScreens = {
    AuthScreen: load(() => import('./AuthScreen')),

    InvitationScreen: load(() => import('./InvitationScreen')),
};