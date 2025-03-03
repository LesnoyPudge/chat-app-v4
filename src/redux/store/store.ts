/* eslint-disable unicorn/prefer-spread */
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { Features } from '@/redux/features';
import type {
    Action,
    CombinedSliceReducer,
    ThunkAction,
} from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { isDev } from '@/vars';
import { useSharedListenerMiddleware } from '@/redux/utils';



type FeaturesType = typeof Features;

const _slices = Object.values(Features).map((s) => s.Slice);

type Apis = T.ConditionalExcept<{
    [_Key in keyof FeaturesType]: (
        (FeaturesType)[_Key] extends { Api: infer _Api } ? _Api : never
    )
}, never>;

type ApisArray = Apis[keyof Apis][];

const _apis = (
    Object.keys<FeaturesType>(Features)
        .map((key) => {
            if ('Api' in Features[key]) {
                return Features[key].Api;
            }

            return;
        })
        .filter(Boolean)
) as ApisArray;

type FixedSlices = T.Simplify<(
    {
        [_Key in keyof FeaturesType as FeaturesType[_Key]['Slice']['name']]: (
            ReturnType<FeaturesType[_Key]['Slice']['getInitialState']>
        )
    }
)>;

const rootReducer = combineSlices(
    ..._slices,
    ..._apis,
) as unknown as (
    CombinedSliceReducer<T.Simplify<(
        ReturnType<ReturnType<typeof combineSlices<ApisArray>>>
        & FixedSlices
    )>>
);

type Effects = {
    [_Key in keyof FeaturesType]: (
        (FeaturesType)[_Key] extends {
            Effects: infer _Effects;
        } ? _Effects : never
    )
}[keyof FeaturesType];

const _effects = (
    Object.keys<FeaturesType>(Features)
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
    [_Key in keyof FeaturesType]: (
        (FeaturesType)[_Key]['Slice']
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