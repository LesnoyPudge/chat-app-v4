import { lazyLoad } from '@lesnoypudge/utils-react';



const load = lazyLoad.basePreloadedComponent;

export const LazyPanels = {
    ConversationNavigation: load(() => import('./ConversationNavigation')),

    ServerNavigation: load(() => import('./ServerNavigation')),
};