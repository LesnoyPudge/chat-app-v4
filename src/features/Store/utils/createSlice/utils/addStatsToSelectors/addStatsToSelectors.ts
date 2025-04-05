import { ReduxToolkit } from '@/libs';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { invariant } from '@lesnoypudge/utils';



export const addStatsToSelectors = <
    _Selectors extends Record<string, T.AnyFunction>,
>({
    sliceName,
    selectors,
}: {
    sliceName: string;
    selectors: _Selectors;
}) => {
    for (const selectorName of Object.keys(selectors)) {
        const originalSelector = selectors[selectorName];
        invariant(originalSelector);

        Object.assign(
            originalSelector,
            {
                displayName: `${sliceName}/${selectorName}`,
                recomputations: '__SKIP__',
            },
        );

        Object.assign(selectors, {
            [selectorName]: originalSelector,
        });
    }
};