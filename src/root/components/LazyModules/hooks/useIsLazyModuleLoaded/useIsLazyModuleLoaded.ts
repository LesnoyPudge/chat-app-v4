import { useConst } from '@lesnoypudge/utils-react';
import { useLazyModulesContextSelector } from '../../context';
import { Types } from '../../types';
import { useSyncExternalStore } from 'react';



export const useIsLazyModuleLoaded = (
    moduleName: Types.ModuleNames,
) => {
    const instance = useLazyModulesContextSelector((v) => v.instance);
    const module = useConst(() => instance.getModules()[moduleName]);

    return useSyncExternalStore(
        (listener) => module.onLoad(listener),
        module.getIsLoaded,
    );
};