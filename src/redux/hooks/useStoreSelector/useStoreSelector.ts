import { useFunction } from '@lesnoypudge/utils-react';
import { RootState } from '@/redux/store';
import { logger } from '@/utils';
import { isProd } from '@/vars';
import { useSelector } from 'react-redux';
import { deepEqual } from '@lesnoypudge/utils';
import { T } from '@lesnoypudge/types-utils-base/namespace';



const SLOW_SELECTOR_THRESHOLD = 10;

const useTypedSelector = useSelector.withTypes<RootState>();

const getSelectorName = (selector: T.AnyFunction) => {
    if ('selectorName' in selector) return String(selector.selectorName);

    return selector.name ?? 'unknown';
};

export const useStoreSelector = <
    _Return,
>(
    selector: (state: RootState) => _Return,
): _Return => {
    const memoizedSelector = useFunction((state: RootState) => {
        if (isProd) return selector(state);

        const firstResult = selector(state);
        const secondResult = selector(state);
        const notEqual = firstResult !== secondResult;
        const selectorName = getSelectorName(selector);

        if (notEqual) {
            logger.log(`Selector ${selectorName} returned different reference`);
        }

        const startTime = performance.now();
        const result = selector(state);
        const diff = performance.now() - startTime;

        if (diff >= SLOW_SELECTOR_THRESHOLD) {
            console.log(`Found slow selector ${selectorName}: ${diff}ms`);
        }

        return result;
    });

    return useTypedSelector(memoizedSelector, deepEqual);
};