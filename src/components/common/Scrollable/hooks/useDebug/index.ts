import { isDev } from '@/vars';
import { T } from '@lesnoypudge/types-utils-base';
import { noop } from '@lesnoypudge/utils';



export const useDebug = (
    isDev
        ? await import('./useDebug').then((v) => v.useDebug)
        : noop as T.AnyFunction
);