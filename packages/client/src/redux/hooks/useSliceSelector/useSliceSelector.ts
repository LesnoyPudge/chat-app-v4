import { useSelector } from 'react-redux';
import type { Slices, RootState } from '@redux/store';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { memoize } from 'proxy-memoize';
import { useCallback } from 'react';
import { EntityState, Slice } from '@reduxjs/toolkit';



const useTypedSelector = useSelector.withTypes<RootState>();

const defaultSelector = <
    _Slice extends T.ValueOf<Slices>,
    _Return,
>(
    state: (
        _Slice extends Slice<infer _State>
            ? _State
            : _Slice extends Slice<EntityState<infer _State, string>>
                ? _State
                : never
    ),
) => {
    return state as _Return;
};

export namespace useSliceSelector {
    export type Selector<
        _Slice extends T.ValueOf<Slices>,
        _Return,
    > = (
        state: (
            _Slice extends Slice<infer _State>
                ? _State
                : _Slice extends Slice<EntityState<infer _State, string>>
                    ? _State
                    : never
        )
    ) => _Return;
}

export const useSliceSelector = <
    _Slice extends T.ValueOf<Slices>,
    _Return = RootState[_Slice['name']],
>(
    slice: _Slice,
    selector: useSliceSelector.Selector<
        _Slice,
        _Return
    > = defaultSelector,
    deps?: unknown[],
): _Return => {
    const memoizedSelector = useCallback((state: RootState) => {
        // @ts-expect-error
        return memoize(selector)(state[slice.name]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps ?? []);

    return useTypedSelector(memoizedSelector);
};