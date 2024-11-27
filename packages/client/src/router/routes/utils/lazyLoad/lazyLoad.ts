import { inRange, sleep } from '@lesnoypudge/utils';
import { isDev } from '@vars';
import { lazy } from 'react';



export const lazyLoad = (path: string) => {
    return lazy(async () => {
        if (isDev) {
            await sleep(inRange(300, 500));
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return import(path);
    });
};