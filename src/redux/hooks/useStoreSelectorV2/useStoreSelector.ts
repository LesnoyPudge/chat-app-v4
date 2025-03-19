import { useFunction } from '@lesnoypudge/utils-react';
import { RootState, Slices } from '@/redux/store';
import { logger } from '@/utils';
import { isProd } from '@/vars';
import { useSelector } from 'react-redux';
import { deepEqual, isCallable } from '@lesnoypudge/utils';
import { T } from '@lesnoypudge/types-utils-base/namespace';



const SLOW_SELECTOR_THRESHOLD = 5;

const useTypedSelector = useSelector.withTypes<RootState>();

const getSelectorName = (selector: T.AnyFunction) => {
    if ('selectorName' in selector) return String(selector.selectorName);

    return selector.name.trim() ?? 'unknown';
};

const baseStateSelector = (state: RootState) => state;

const getStateForSelector = (selector: T.AnyFunction) => {
    if (
        'getState' in selector
        && isCallable(selector.getState)
    ) return selector.getState() as (
        (state: RootState) => RootState | T.ValueOf<Slices>
    );

    return baseStateSelector;
};

export const useStoreSelector = <
    _Return,
>(
    selector: (state: RootState | T.ValueOf<Slices>) => _Return,
): _Return => {
    const stableSelector = useFunction((rootState: RootState) => {
        const state = getStateForSelector(selector)(rootState);

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

    return useTypedSelector(
        stableSelector,
        // deepEqual
    );
};