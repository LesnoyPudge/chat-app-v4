import { isDev } from '@/vars';
import { inRange } from '@lesnoypudge/utils';
import { lazyLoad } from '@lesnoypudge/utils-react';



export const baseAsyncComponent = lazyLoad.createBaseAsyncLoadedComponent({
    delay: {
        enable: isDev,
        delay: inRange(300, 500),
    },
});