import { StoreTypes } from '@/store/types';
import { combinedFunction } from '@lesnoypudge/utils';
import { createSharedListenerMiddleware } from '@/store/utils';



type Config = {
    effects?: (store: StoreTypes.Store) => VoidFunction[];
    listenerMiddlewares?: ((
        props: ReturnType<typeof createSharedListenerMiddleware>
    ) => void)[];
};

type Return = {
    setupEffects: (store: StoreTypes.Store) => VoidFunction;
};

export const createEffects = (config: Config): Return => {
    return {
        setupEffects: (store) => {
            const effectsCleanup = config.effects?.(store) ?? [];

            const cleanup = combinedFunction(...effectsCleanup);

            config.listenerMiddlewares?.forEach((listener) => {
                listener(createSharedListenerMiddleware());
            });

            return cleanup;
        },
    };
};