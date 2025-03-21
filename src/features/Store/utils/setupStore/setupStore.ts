import { StoreTypes } from '@/store/types';
import * as features from '@/store/features';
import { createSharedListenerMiddleware, injectedStore } from '@/store/utils';
import { ReduxToolkit, ReduxToolkitQueryReact } from '@/libs';



const slices = [
    features.App._Slice,
    features.Channels._Slice,
    features.Conversations._Slice,
    features.Messages._Slice,
    features.Roles._Slice,
    features.Servers._Slice,
    features.TextChats._Slice,
    features.Users._Slice,
    features.VoiceChats._Slice,
] as const;

const apis = [
    features.Channels.Api,
    features.Conversations.Api,
    features.Messages.Api,
    features.Roles.Api,
    features.Servers.Api,
    features.TextChats.Api,
    features.Users.Api,
    features.VoiceChats.Api,
] as const;

const rootReducer = ReduxToolkit.combineSlices(
    ...slices,
    ...apis,
);

const setupEffects = (store: StoreTypes.Store) => {
    features.App.Effects.setupEffects(store);
};

export const setupStore = (preloadedState?: Partial<StoreTypes.State>) => {
    const store = ReduxToolkit.configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => (
            getDefaultMiddleware()
                .prepend([
                    createSharedListenerMiddleware().middleware,
                    ...apis.map((api) => api.middleware),
                ])
        ),
        preloadedState,
    });

    injectedStore.setStore(store);

    ReduxToolkitQueryReact.setupListeners(store.dispatch);

    setupEffects(store);

    return store;
};