import { useFunction } from '@lesnoypudge/utils-react';
import { StoreTypes } from '@/store/types';
import { logger } from '@/utils';
import { isProd } from '@/vars';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useMemo } from 'react';
import { shallowEqual } from '@lesnoypudge/utils';
import { ReduxReact } from '@/libs';



const SLOW_SELECTOR_THRESHOLD = 5;

const useTypedSelector = ReduxReact.useSelector.withTypes<StoreTypes.State>();

const getSelectorName = (selector: T.AnyFunction) => {
    let displayName: string | undefined;

    if ('displayName' in selector) {
        displayName = String(selector.displayName);
    };

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return displayName || selector.name.trim() || 'unknown';
};

const defaultTransformer = <_Value>(state: _Value) => state;

export const useSelector = <
    _FirstReturn,
    _SecondReturn = _FirstReturn,
>(
    selector: (state: StoreTypes.State) => _FirstReturn,
    transformer?: (state: _FirstReturn) => _SecondReturn,
): _SecondReturn => {
    const stableSelector = useFunction((state: StoreTypes.State) => {
        if (isProd) return selector(state);

        const startTime = performance.now();
        const result = selector(state);
        const diff = performance.now() - startTime;
        const selectorName = getSelectorName(selector);

        if (diff >= SLOW_SELECTOR_THRESHOLD) {
            logger.warn(`Found slow selector ${selectorName}: ${diff}ms`);
        }

        const secondResult = selector(state);
        const notEqual = result !== secondResult;

        if (notEqual) {
            logger.log(`Selector ${selectorName} returned different reference`);
            logger.trace(selectorName);
        }

        return result;
    });

    const selectorResult = useTypedSelector(
        stableSelector,
        shallowEqual,
    );

    const stableTransformer = useFunction(transformer ?? defaultTransformer);

    const result = useMemo(() => {
        return stableTransformer(
            selectorResult as _FirstReturn & _SecondReturn,
        );
    }, [selectorResult, stableTransformer]);

    return result;
};