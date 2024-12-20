/* eslint-disable unicorn/prefer-spread */
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { Features } from '@redux/features';
import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { isDev } from '@vars';
import { useSharedListenerMiddleware } from '@redux/utils';



const _slices = (
    Object.keys<typeof Features>(Features)
        .map((key) => Features[key].Slice)
);

type Apis = {
    [_Key in keyof typeof Features]: (
        (typeof Features)[_Key] extends { Api: infer _Api } ? _Api : never
    )
}[keyof typeof Features];

const _apis = (
    Object.keys<typeof Features>(Features)
        .map((key) => {
            if ('Api' in Features[key]) {
                return Features[key].Api;
            }

            return;
        })
        .filter(Boolean)
) as Apis[];

type Effects = {
    [_Key in keyof typeof Features]: (
        (typeof Features)[_Key] extends {
            Effects: infer _Effects;
        } ? _Effects : never
    )
}[keyof typeof Features];

const _effects = (
    Object.keys<typeof Features>(Features)
        .map((key) => {
            if ('Effects' in Features[key]) {
                return Features[key].Effects;
            }

            return;
        })
        .filter(Boolean)
) as Effects[];

const setupEffects = (store: AppStore) => _effects.forEach((effect) => {
    effect.setupEffects(store);
});

const rootReducer = combineSlices(
    ..._slices,
    ..._apis,
);

const apiMiddlewares = _apis.map((api) => api.middleware);

const listenerMiddleware = (
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSharedListenerMiddleware().middleware
) as T.AnyFunction;

export const makeStore = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => (
            getDefaultMiddleware()
                .prepend(listenerMiddleware)
                .concat(apiMiddlewares)
        ),
        preloadedState,
    });

    setupListeners(store.dispatch);

    setupEffects(store);

    return store;
};

export type RootState = ReturnType<typeof rootReducer>;

export const store = makeStore();

export type Slices = {
    [_Key in keyof typeof Features]: (
        (typeof Features)[_Key]['Slice']
    )
};

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;

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