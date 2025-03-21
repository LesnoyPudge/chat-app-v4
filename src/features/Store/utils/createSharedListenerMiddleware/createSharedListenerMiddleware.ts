import { ReduxToolkit } from '@/libs';
import { StoreTypes } from '@/store/types';



const {
    clearListeners,
    middleware,
    startListening,
    stopListening,
} = ReduxToolkit.createListenerMiddleware<StoreTypes.State, StoreTypes.Dispatch>();

export const createSharedListenerMiddleware = () => {
    return {
        clearListeners,
        middleware,
        startListening: startListening.withTypes<
            StoreTypes.State, StoreTypes.Dispatch
        >(),
        stopListening,
    };
};