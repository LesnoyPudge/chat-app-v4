/* eslint-disable unicorn/prefer-spread */
import { Features } from '@redux/features';
import { listenerMiddleware } from '@redux/utils';
import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';



const rootReducer = combineSlices(
    Features.App.Slice,
);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => (
            getDefaultMiddleware()
                .prepend(listenerMiddleware.middleware)
                .concat()
        ),
        preloadedState,
    });

    setupListeners(store.dispatch);

    Features.App.setupEffects(store);

    return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;