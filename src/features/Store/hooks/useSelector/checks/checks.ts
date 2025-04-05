import { StoreTypes } from '@/store/types';
import { logger } from '@/utils';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { invariant, isCallable, toOneLine } from '@lesnoypudge/utils';



const SLOW_FIRST_RUN_THRESHOLD = 5;
const SLOW_SECOND_RUN_THRESHOLD = 2;

export const checks = (() => {
    const getSelectorName = (selector: T.AnyFunction) => {
        let displayName: string | undefined;

        if ('displayName' in selector) {
            displayName = String(selector.displayName);
        };

        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        return displayName || selector.name.trim() || 'unknown';
    };

    const detectBrokenStats = (selector: T.AnyFunction) => {
        const withDisplayName = 'displayName' in selector;
        const withRecomputations = 'recomputations' in selector;
        if (withDisplayName && withRecomputations) return;

        const displayName = getSelectorName(selector);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const recomputations = (selector as T.AnyRecord)?.recomputations;

        logger.selectors.log(`
            Found selector with broken stats:
              • Display Name   : ${displayName}
              • Recomputations : ${recomputations}
            `.trim(),
        );

        logger.selectorsTrace.trace(displayName);
    };

    const getRecomputationCount = (selector: T.AnyFunction): number => {
        if (!('recomputations' in selector)) return 0;
        if (!isCallable(selector.recomputations)) return 0;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result = selector.recomputations();
        invariant(typeof result === 'number');

        return result;
    };

    const detectSlowFirstRun = (
        selector: T.AnyFunction,
        state: StoreTypes.State,
    ) => {
        const selectorName = getSelectorName(selector);
        const measureStart = performance.now();

        selector(state);

        const measureDiff = performance.now() - measureStart;

        if (measureDiff >= SLOW_FIRST_RUN_THRESHOLD) {
            logger.selectors.log(toOneLine(`
                Found slow first run of 
                selector ${selectorName}: ${measureDiff}ms.
            `));
            logger.selectorsTrace.trace(selectorName);
        }
    };

    const detectSlowSecondRun = (
        selector: T.AnyFunction,
        state: StoreTypes.State,
    ) => {
        const selectorName = getSelectorName(selector);
        const measureStart = performance.now();

        selector(state);

        const measureDiff = performance.now() - measureStart;

        if (measureDiff >= SLOW_SECOND_RUN_THRESHOLD) {
            logger.selectors.log(toOneLine(`
                Found slow second run of 
                selector ${selectorName}: ${measureDiff}ms.
            `));
            logger.selectorsTrace.trace(selectorName);
        }
    };

    const detectRecomputations = (
        selector: T.AnyFunction,
        state: StoreTypes.State,
    ) => {
        const selectorName = getSelectorName(selector);

        selector(state);

        const firstRecomputeCount = getRecomputationCount(selector);

        selector(state);

        const secondRecomputeCount = getRecomputationCount(selector);

        const isRecomputed = firstRecomputeCount !== secondRecomputeCount;

        if (isRecomputed) {
            logger.selectors.log(
                `Selector ${selectorName} has unnecessary recomputations.`,
            );
            logger.selectorsTrace.trace(selectorName);
        }
    };

    const detectUnstableReturn = (
        selector: T.AnyFunction,
        state: StoreTypes.State,
    ) => {
        const selectorName = getSelectorName(selector);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const firstResult = selector(state);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const secondResult = selector(state);

        if (firstResult !== secondResult) {
            logger.selectors.log(
                `Selector ${selectorName} returned different reference.`,
            );
            logger.selectorsTrace.trace(selectorName);
        }
    };

    return {
        detectRecomputations,
        detectSlowFirstRun,
        detectSlowSecondRun,
        detectBrokenStats,
        detectUnstableReturn,
    };
})();