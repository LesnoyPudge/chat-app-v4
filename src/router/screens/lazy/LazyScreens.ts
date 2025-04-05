import { baseAsyncComponent } from '@/utils';



const load = baseAsyncComponent;

export const LazyScreens = {
    Auth: load(() => import('./AuthScreen')),

    Invitation: load(() => import('./InvitationScreen')),
};