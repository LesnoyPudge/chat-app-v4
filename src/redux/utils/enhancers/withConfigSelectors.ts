import { T } from '@lesnoypudge/types-utils-base/namespace';
import { capitalize, isCallable } from '@lesnoypudge/utils';
import {
    CreateSliceOptions,
    SliceCaseReducers,
    SliceSelectors,
} from '@reduxjs/toolkit';



type Selectors<
    _State extends T.UnknownRecord,
> = T.UnionToIntersection<{

    [_Key in keyof _State]: _Key extends string
        ? Record<
            `select${Capitalize<_Key>}`,
            (state: _State) => _State[_Key]
        >
        : never
}[keyof _State]>;

export const withConfigSelectors = <
    _State extends T.UnknownRecord,
    _CaseReducers extends SliceCaseReducers<_State>,
    _Name extends string,
    _Selectors extends SliceSelectors<_State>,
    _ReducerPath extends string = _Name,
>(
    config: CreateSliceOptions<
        _State,
        _CaseReducers,
        _Name,
        _ReducerPath,
        _Selectors
    >,
) => {
    const { selectors } = config;

    const state = (
        isCallable(config.initialState)
            ? config.initialState()
            : config.initialState
    );

    const modifiedSelectors = {
        ...(
            Object.keys<_State>(state)
                .reduce<Selectors<_State>>((acc, cur) => {
                    const name = `select${capitalize(cur)}`;

                    // @ts-expect-error
                    acc[name] = (state: _State) => {
                        return state[cur];
                    };

                    return acc;
                }, {})
        ),
        ...selectors,
    } as _Selectors & Selectors<_State>;

    return {
        ...config,
        selectors: modifiedSelectors,
    };
};