import { StoreTypes } from '@/store/types';
import * as features from '@/store/features';
import {
    createSharedListenerMiddleware,
    getRootApi,
    injectedStore,
} from '@/store/utils';
import { ReduxToolkit, ReduxToolkitQueryReact } from '@/libs';
import { isDevOrPreview } from '@/vars';
import { devtools } from '@/features';
import { globalActions } from '@/store/globalActions';



const names = Object.keys<typeof features>(features);

const slices = names.map((name) => features[name]._Slice);

const setupEffects = (store: StoreTypes.Store) => {
    names.forEach((name) => {
        const slice = features[name];
        if (!('Effects' in slice)) return;

        slice.Effects.setupEffects(store);
    });
};

export const setupStore = (preloadedState?: Partial<StoreTypes.State>) => {
    const rootReducer = ReduxToolkit.combineSlices(
        ...slices,
        getRootApi(),
    );

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

    if (isDevOrPreview) {
        devtools.append('reduxStore', store);
        devtools.append('softReset', globalActions.softReset);
    }

    return store;
};