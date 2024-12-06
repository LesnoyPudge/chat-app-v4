import {
    createListenerMiddleware,
    addListener as _addListener,
} from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '@redux/store';



export namespace listenerMiddleware {
    export const {
        clearListeners,
        middleware,
        startListening: _startListening,
        stopListening,
    } = createListenerMiddleware();

    export const startListening = _startListening.withTypes<
        RootState,
        AppDispatch
        // ExtraArgument
    >();

    export const addListener = _addListener.withTypes<
        RootState, AppDispatch
    >();
}