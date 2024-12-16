/* eslint-disable unicorn/prefer-spread */
import { Features } from '@redux/features';
import { listenerMiddleware } from '@redux/utils';
import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { isDev } from '@vars';



const rootReducer = combineSlices(
    Features.App.Slice,
    Features.User.Slice,
    Features.User.Api,
);

export type Slices = {
    [Features.App.Slice.name]: typeof Features.App.Slice;
    [Features.User.Slice.name]: typeof Features.User.Slice;
};

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => (
            getDefaultMiddleware()
                .prepend(listenerMiddleware.middleware)
                .concat(
                    Features.User.Api.middleware,
                )
        ),
        preloadedState,
    });

    setupListeners(store.dispatch);

    Features.App.setupEffects(store);

    return store;
};

export const store = makeStore();

if (isDev) {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    window._devtools = {
        // @ts-expect-error
        ...window._devtools,
        store,
        softReset: Features.App.Slice.actions.softReset,
    };
}

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;