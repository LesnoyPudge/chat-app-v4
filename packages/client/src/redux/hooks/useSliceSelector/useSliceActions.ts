import type { Slices, RootState } from '@redux/store';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useStoreSelector } from '../useStoreSelector';



export namespace useSliceSelector {
    export type Selector<
        _Name extends keyof RootState,
        _Return,
    > = (
        state: RootState[_Name]
    ) => _Return;
}

export const useSliceSelector = <
    _Slice extends T.ValueOf<Slices>,
    _Return = RootState[_Slice['name']],
>(
    slice: _Slice,
    selector: useSliceSelector.Selector<
        _Slice['name'],
        _Return
    >,
): _Return => {
    return useStoreSelector((state) => {
        const sliceState = state[slice.name] as RootState[_Slice['name']];
        return selector(sliceState);
    });
};