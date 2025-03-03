import { createLocalStorageHook } from '@lesnoypudge/utils-react';
import { localStorageApi } from '@/utils';



export const useLocalStorage = createLocalStorageHook<
    localStorageApi.Storage
>();