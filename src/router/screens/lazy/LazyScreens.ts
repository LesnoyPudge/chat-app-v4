import { baseAsyncComponent } from '@/utils';



const load = baseAsyncComponent;

export const LazyScreens = {
    AuthScreen: load(() => import('./AuthScreen')),

    InvitationScreen: load(() => import('./InvitationScreen')),
};