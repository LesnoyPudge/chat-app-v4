/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Store } from '@/features';
import { ReduxToolkit } from '@/libs';
import { logger } from '@/utils';



type DevTools = {
    reduxStore?: Store.Types.Store;
    softReset?: ReduxToolkit.ActionCreatorWithoutPayload;
    axeReact?: VoidFunction;
    navigateToRoot?: VoidFunction;
};

export const devtools = (() => {
    const append = <
        _Key extends keyof DevTools,
    >(
        key: _Key,
        value: NonNullable<DevTools[_Key]>,
    ) => {
        if (!(window as any)._devtools) {
            (window as any)._devtools = {};
        }

        (window as any)._devtools[key] = value;
    };

    const get = <
        _Key extends keyof DevTools,
    >(key: _Key) => {
        const devtools = (window as any)._devtools as DevTools | undefined;
        if (!devtools) {
            logger._errors.error('devtools not initialized');
            return;
        }

        const value = devtools[key];
        if (!value) {
            logger._errors.error(`devtools value ${key} not initialized`);
            return;
        }

        return value;
    };

    return {
        append,
        get,
    };
})();