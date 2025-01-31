import { createLocalStorageHook } from '_@lesnoypudge/utils-react';
import { localStorageApi } from '@utils';



export const useLocalStorage = createLocalStorageHook<
    localStorageApi.Storage
>();