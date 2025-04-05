import { useFunction } from '@lesnoypudge/utils-react';
import { StoreTypes } from '@/store/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useRef } from 'react';
import { shallowEqual } from '@lesnoypudge/utils';
import { useSelector } from '../useSelector';
import { isDev } from '@/vars';



type StoreWithSliceHolders = {
    [_SliceName in keyof StoreTypes.Slices]: {
        _Slice: StoreTypes.Slices[_SliceName];
    }
};

const EMPTY_STATE = {};

export const useSliceSelector = <
    _SliceHolder extends T.ValueOf<StoreWithSliceHolders>,
    _Slice extends _SliceHolder['_Slice'],
    _Result,
>(
    sliceHolder: _SliceHolder,
    selector: (state: StoreTypes.State[_Slice['name']]) => _Result,
): _Result => {
    const prevResultRef = useRef<_Result | typeof EMPTY_STATE>(EMPTY_STATE);

    const stableSelector = useFunction((state: StoreTypes.State) => {
        const slice = sliceHolder._Slice as _Slice;
        const sliceState = state[slice.name as _Slice['name']];

        const result = selector(sliceState);

        const prev = prevResultRef.current;

        if (prev === EMPTY_STATE) {
            prevResultRef.current = result;
            return result;
        }

        if (shallowEqual(prev, result)) {
            return prev;
        }

        prevResultRef.current = result;

        return result;
    });

    if (isDev) {
        const displayName = (
            selector as T.AnyRecord
        )?.displayName as string | undefined;

        Object.assign(
            stableSelector,
            {
                displayName: displayName ?? `${
                    sliceHolder._Slice.name
                }/inlineSliceSelector`,
            },
        );

        const recomputations = (
            selector as T.AnyRecord
        )?.recomputations as T.AnyFunction | undefined;

        Object.assign(
            stableSelector,
            {
                recomputations: recomputations ?? '__SKIP__',
            },
        );
    }

    return useSelector(stableSelector);
};