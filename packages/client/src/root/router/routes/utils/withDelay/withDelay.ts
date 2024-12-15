import { inRange, sleep } from '@lesnoypudge/utils';
import { isDev } from '@vars';



export const withDelay = <
    _Component,
>(fn: () => Promise<_Component>, delay?: number) => {
    return async () => {
        if (isDev) {
            await sleep(delay ?? inRange(300, 500));
        }

        return fn();
    };
};