import { ContextSelectable } from '@lesnoypudge/utils-react';
import { LazyModulesContext } from '../../context';



export const useLazyModulesContext = () => {
    return ContextSelectable.useProxy(LazyModulesContext);
};