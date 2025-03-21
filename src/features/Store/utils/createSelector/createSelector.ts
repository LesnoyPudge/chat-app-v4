import { StoreTypes } from '@/store/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import {
    createSelectionContext,
    EnhancedSelector,
    QueryFunction,
    SelectionLogic,
} from '@taskworld.com/rereselect';



type WithDisplayName<_Fn extends T.AnyFunction> = (
    _Fn
    & { displayName: string }
);

const { makeSelector } = createSelectionContext<StoreTypes.State>();

const makeNamedSelector = <_Result>(
    logic: SelectionLogic<StoreTypes.State, _Result>,
    displayName = 'unnamed',
) => {
    return Object.assign(
        makeSelector(logic),
        { displayName },
    ) as WithDisplayName<ReturnType<typeof makeSelector<_Result>>>;
};

const makeNamedSelectorWithParams = <
    _Selector extends (...args: any[]) => (
        (query: QueryFunction<StoreTypes.State>) => unknown
    ),
>(
    selectionLogicGenerator: _Selector,
    displayName = 'unnamed',
) => {
    const memoized = new Map();

    const selectorFactory = ((...args: any[]) => {
        const key = args.join(',');

        if (memoized.has(key)) return memoized.get(key)!;

        const name = `${displayName}(${key})`;
        const selectionLogic = selectionLogicGenerator(...args);
        const selector = makeSelector(selectionLogic);

        (selector as WithDisplayName<typeof selector>).displayName = name;

        memoized.set(key, selector);

        return selector;
    }) as (
        (...args: Parameters<_Selector>) => (
            EnhancedSelector<
                StoreTypes.State,
                ReturnType<ReturnType<_Selector>>
            >
        )
    );

    return Object.assign(
        selectorFactory,
        { displayName },
    ) as WithDisplayName<typeof selectorFactory>;
};

const makeSimpleNamedSelector = <_Result>(
    selector: (rootState: StoreTypes.State) => _Result,
    displayName = 'unnamed',
) => {
    return Object.assign(
        selector,
        {
            displayName,
        },
    ) as WithDisplayName<typeof selector>;
};

export type createSelector = (
    typeof makeNamedSelector
    & {
        withParams: typeof makeNamedSelectorWithParams;
        simple: typeof makeSimpleNamedSelector;
    }
);

export const createSelector = Object.assign(
    makeNamedSelector,
    {
        withParams: makeNamedSelectorWithParams,
        simple: makeSimpleNamedSelector,
    },
) as createSelector;