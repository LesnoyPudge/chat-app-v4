import { lazyLoad } from '@lesnoypudge/utils-react';



const load = lazyLoad.basePreloadedComponent;

export const LazyLayouts = {
    WithPrimaryNavigation: load(() => import('./WithPrimaryNavigation')),

    WithSecondaryNavigation: load(() => import('./WithSecondaryNavigation')),
};