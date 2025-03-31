import { basePreloadedComponent } from '@/utils';



const load = basePreloadedComponent;

export const LazyLayouts = {
    WithPrimaryNavigation: load(() => import('./WithPrimaryNavigation')),

    WithSecondaryNavigation: load(() => import('./WithSecondaryNavigation')),
};