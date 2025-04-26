import { basePreloadedComponent } from '@/utils';



const { load, trigger } = basePreloadedComponent;

export const LazyLayouts = {
    trigger,

    WithPrimaryNavigation: load(() => import('./WithPrimaryNavigation')),

    WithSecondaryNavigation: load(() => import('./WithSecondaryNavigation')),
};