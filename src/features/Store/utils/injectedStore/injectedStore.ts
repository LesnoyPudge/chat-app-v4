import { invariant } from '@lesnoypudge/utils';
import { StoreTypes } from '@/store/types';



let currentStore: StoreTypes.Store | null = null;

export const injectedStore = {
    setStore: (store: StoreTypes.Store) => {
        currentStore = store;
    },

    getStore: () => {
        invariant(currentStore, 'Store is accessed before being set.');

        return currentStore;
    },
};