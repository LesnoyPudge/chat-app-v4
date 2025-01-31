import type { AppStore } from '@redux/store';
import {
    useSharedListenerMiddleware,
} from '../useSharedListenerMiddleware';
import { combinedFunction } from '@lesnoypudge/utils';



type Config = {
    effects?: (store: AppStore) => VoidFunction[];
    listenerMiddlewares?: ((
        props: ReturnType<typeof useSharedListenerMiddleware>
    ) => void)[];
};

type Return = {
    setupEffects: (store: AppStore) => VoidFunction;
};

export const createEffects = (config: Config): Return => {
    return {
        setupEffects: (store) => {
            const effectsCleanup = config.effects?.(store) ?? [];

            const cleanup = combinedFunction(...effectsCleanup);

            config.listenerMiddlewares?.forEach((listener) => {
                listener(useSharedListenerMiddleware());
            });

            return cleanup;
        },
    };
};