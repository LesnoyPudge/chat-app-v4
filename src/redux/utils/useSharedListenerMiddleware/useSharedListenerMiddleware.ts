import {
    createListenerMiddleware,
    addListener as _addListener,
} from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '@redux/store';



const {
    clearListeners,
    middleware,
    startListening,
    stopListening,
} = createListenerMiddleware<RootState, AppDispatch>();

export const useSharedListenerMiddleware = () => {
    return {
        clearListeners,
        middleware,
        startListening: startListening.withTypes<RootState, AppDispatch>(),
        stopListening,
    };
};