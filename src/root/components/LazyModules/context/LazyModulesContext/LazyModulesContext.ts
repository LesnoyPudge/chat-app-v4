import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export const {
    LazyModulesContext,
    useLazyModulesContextProxy,
    useLazyModulesContextSelector,
} = ContextSelectable.createContextWithHooks<
    Types.Context
>().withName('LazyModules');