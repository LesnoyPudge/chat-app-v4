import { basePreloadedComponent } from '@/utils';



const { load, trigger } = basePreloadedComponent;

export const LazyPanels = {
    trigger,

    ConversationNavigation: load(() => import('./ConversationNavigationPanel')),

    ServerNavigation: load(() => import('./ServerNavigationPanel')),

    Friends: load(() => import('./FriendsPanel')),

    ChannelFinder: load(() => import('./ChannelFinderPanel')),

    Channel: load(() => import('./ChannelPanel')),

    Conversation: load(() => import('./ConversationPanel')),
};