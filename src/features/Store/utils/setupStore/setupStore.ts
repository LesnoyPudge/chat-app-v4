import { StoreTypes } from '@/store/types';
import * as features from '@/store/features';
import {
    createSharedListenerMiddleware,
    getRootApi,
    injectedStore,
} from '@/store/utils';
import { ReduxToolkit, ReduxToolkitQueryReact } from '@/libs';
import { isDev } from '@/vars';
import { devtools } from '@/features';
import { globalActions } from '@/store/globalActions';



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

export const setupStore = (preloadedState?: Partial<StoreTypes.State>) => {
    const rootReducer = ReduxToolkit.combineSlices(
        ...slices,
        getRootApi(),
    );

    const setupEffects = (store: StoreTypes.Store) => {
        features.App.Effects.setupEffects(store);
    };

    const store = ReduxToolkit.configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => (
            getDefaultMiddleware()
                .prepend([
                    createSharedListenerMiddleware().middleware,
                    getRootApi().middleware,
                ])
        ),
        preloadedState,
    });

    injectedStore.setStore(store);

    ReduxToolkitQueryReact.setupListeners(store.dispatch);

    setupEffects(store);

    if (isDev) {
        devtools.append('reduxStore', store);
        devtools.append('softReset', globalActions.softReset);
    }

    return store;
};