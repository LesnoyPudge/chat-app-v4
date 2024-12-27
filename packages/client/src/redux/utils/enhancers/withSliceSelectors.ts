/* eslint-disable @typescript-eslint/no-explicit-any */
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { Slice } from '@reduxjs/toolkit';
import { toCurriedSelectors } from '../toCurriedSelectors';



type SliceWithModifiedSelectors<
    _Slice extends Slice,
    _Selectors extends toCurriedSelectors.GenericSelectors,
> = (
    T.Except<T.Simplify<_Slice>, 'selectors'> & {
        selectors: toCurriedSelectors.CurriedSelectors<_Selectors>;
    }
);

export const withSliceSelectors = <
    _Slice extends Slice,
    _State extends _Slice extends Slice<infer _State> ? _State : never,
    _Selectors extends (
        _Slice extends Slice<any, any, any, any, infer _Selectors>
            ? _Selectors
            : never
    ),
>(
    slice: _Slice,
): SliceWithModifiedSelectors<_Slice, _Selectors> => {
    const selectors = slice.getSelectors() as _Selectors;

    const modifiedSelectors = toCurriedSelectors(selectors);

    return {
        ...slice,
        selectors: modifiedSelectors,
    };
};