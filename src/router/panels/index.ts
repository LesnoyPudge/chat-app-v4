import { lazyLoad } from '@lesnoypudge/utils-react';



const load = lazyLoad.basePreloadedComponent;

export const LazyPanels = {
    ConversationNavigation: load(() => import('./ConversationNavigationPanel')),

    ServerNavigation: load(() => import('./ServerNavigationPanel')),

    Friends: load(() => import('./FriendsPanel')),
};