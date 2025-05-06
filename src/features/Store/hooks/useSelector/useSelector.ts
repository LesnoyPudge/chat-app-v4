import { useFunction } from '@lesnoypudge/utils-react';
import { StoreTypes } from '@/store/types';
import { isProd } from '@/vars';
import { useMemo } from 'react';
import { ReduxReact } from '@/libs';
import { checks } from './checks';
import { logger } from '@/utils';
import { getSelectorName } from './utils';



const useTypedSelector = ReduxReact.useSelector.withTypes<StoreTypes.State>();

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

        try {
            checks.detectBrokenStats(selector);
            checks.detectSlowFirstRun(selector, state);
            checks.detectSlowSecondRun(selector, state);
            checks.detectRecomputations(selector, state);
            checks.detectUnstableReturn(selector, state);
        } catch (error) {
            logger._errors.log(`Found error in selector: ${
                getSelectorName(selector)
            }`);
            logger._errors.error(error);
        }

        return selector(state);
    });

    const selectorResult = useTypedSelector(stableSelector);

    const stableTransformer = useFunction(transformer ?? defaultTransformer);

    const result = useMemo(() => {
        return stableTransformer(
            selectorResult as _FirstReturn & _SecondReturn,
        );
    }, [selectorResult, stableTransformer]);

    return result;
};