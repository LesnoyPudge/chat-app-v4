/* eslint-disable unicorn/prefer-spread */
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { Features } from '@redux/features';
import { listenerMiddleware } from '@redux/utils';
import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { isDev } from '@vars';



const _slices = [
    Features.App.Slice,
    Features.User.Slice,
    Features.Servers.Slice,
] as const;

const _apis = [
    Features.User.Api,
    Features.Servers.Api,
] as const;

const rootReducer = combineSlices(
    ..._slices,
    ..._apis,
);

type SlicesArray = typeof _slices;

export type Slices = {
    [_Index in T.IntRange<0, SlicesArray['length']> as (
        SlicesArray[_Index]['name']
    )]: (
        SlicesArray[_Index]
    )
};

const apiMiddlewares = _apis.map((api) => api.middleware);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => (
            getDefaultMiddleware()
                .prepend(listenerMiddleware.middleware)
                .concat(apiMiddlewares)
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