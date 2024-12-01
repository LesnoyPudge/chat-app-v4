import { RouteObject } from 'react-router';
import { lazyLoad } from '../utils';
import { lazy } from 'react';
import { sleep } from '@lesnoypudge/utils';
import { isDev } from '@vars';



const LazyPage = lazy(async () => {
    if (isDev) {
        await sleep(3_000);
        // await sleep(inRange(300, 500));
    }

    return import('./LazyPage');
});

export const ProdRoute: RouteObject[] = [{
    path: '/',
    children: [
        {
            index: true,
            element: (
                <div>
                    <button>qwe</button>
                    <button>zxc</button>
                </div>
            ),
        },
        {
            path: 'nested/some',
            element: <>nested page</>,
        },
    ],
}];