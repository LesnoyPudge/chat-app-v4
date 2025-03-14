import { isDev } from '@/vars';
import { noop } from '@lesnoypudge/utils';


export const useDebug = (
    isDev
        ? await import('./useDebug').then((v) => v.useDebug)
        : noop
);