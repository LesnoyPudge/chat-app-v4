import { lazyLoad } from '@lesnoypudge/utils-react';



const load = lazyLoad.basePreloadedComponent;

export const Layouts = {
    WithPrimaryNavigation: load(() => import('./WithPrimaryNavigation')),

    WithSecondaryNavigation: load(() => import('./WithSecondaryNavigation')),
};