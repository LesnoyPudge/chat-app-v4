/* eslint-disable @stylistic/indent */
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { Slice } from '@reduxjs/toolkit';



type ModifiedSelectors<
    _Slice extends Slice,
> = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _Slice extends Slice<any, any, any, any, infer _Selectors>
        ? {
            [_Key in keyof _Selectors]: (
                (props: (
                    Parameters<_Selectors[_Key]> extends [any, infer _Props]
                        ? _Props
                        : void
                )) => (
                    (state: Parameters<_Selectors[_Key]>[0]) => (
                        ReturnType<_Selectors[_Key]>
                    )
                )
            )
        }
        : never
);

type SliceWithModifiedSelectors<_Slice extends Slice> = (
    Omit<T.Simplify<_Slice>, 'selectors'> & {
        selectors: ModifiedSelectors<_Slice>;
    }
);

export const withSliceSelectors = <
    _Slice extends Slice,
    _State extends (
        _Slice extends Slice<infer _Value>
            ? _Value
            : never
    ),
>(
    slice: _Slice,
): SliceWithModifiedSelectors<_Slice> => {
    const selectors = slice.selectors as Record<
        string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state: _State, props: any) => unknown
    >;

    const modifiedSelectors = (
        Object.keys(selectors)
            .reduce<ModifiedSelectors<_Slice>>((acc, cur) => {
                // @ts-expect-error
                acc[cur] = (...props) => (state) => {
                    // @ts-expect-error
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    return selectors[cur](state, ...props);
                };
                return acc;
            }, {})
    );

    return {
        ...slice,
        selectors: modifiedSelectors,
    };
};