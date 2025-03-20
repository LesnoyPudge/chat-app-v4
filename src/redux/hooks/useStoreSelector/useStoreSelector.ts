import { useFunction } from '@lesnoypudge/utils-react';
import { RootState } from '@/redux/store';
import { logger } from '@/utils';
import { isProd } from '@/vars';
import { useSelector } from 'react-redux';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useMemo } from 'react';
import { shallowEqual } from '@lesnoypudge/utils';



const SLOW_SELECTOR_THRESHOLD = 5;

const useTypedSelector = useSelector.withTypes<RootState>();

const getSelectorName = (selector: T.AnyFunction) => {
    if ('selectorName' in selector) return String(selector.selectorName);

    return selector.name.trim() ?? 'unknown';
};

const defaultTransformer = <_Value>(state: _Value) => state;

export const useStoreSelector = <
    _FirstReturn,
    _SecondReturn = _FirstReturn,
>(
    selector: (state: RootState) => _FirstReturn,
    transformer?: (state: _FirstReturn) => _SecondReturn,
): _SecondReturn => {
    const stableSelector = useFunction((state: RootState) => {
        if (isProd) return selector(state);

        const startTime = performance.now();
        const result = selector(state);
        const diff = performance.now() - startTime;
        const selectorName = getSelectorName(selector);

        if (diff >= SLOW_SELECTOR_THRESHOLD) {
            console.log(`Found slow selector ${selectorName}: ${diff}ms`);
        }

        const secondResult = selector(state);
        const notEqual = result !== secondResult;

        if (notEqual) {
            logger.log(`Selector ${selectorName} returned different reference`);
        }

        return result;
    });

    const selectorResult = useTypedSelector(
        stableSelector,
        shallowEqual,
    );

    const stableTransformer = useFunction(transformer ?? defaultTransformer);

    return useMemo(() => {
        return stableTransformer(
            selectorResult as _FirstReturn & _SecondReturn,
        );
    }, [selectorResult, stableTransformer]);
};