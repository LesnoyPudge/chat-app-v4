import { T } from '@lesnoypudge/types-utils-base/namespace';
import { capitalize, isCallable } from '@lesnoypudge/utils';
import {
    CaseReducer,
    CreateSliceOptions,
    Draft,
    PayloadAction,
    ReducerCreators,
    SliceCaseReducers,
    SliceSelectors,
} from '@reduxjs/toolkit';



type Setters<
    _State extends T.UnknownRecord,
> = T.UnionToIntersection<{

    [_Key in keyof _State]: _Key extends string
        ? Record<
            `set${Capitalize<_Key>}`,
            CaseReducer<_State, PayloadAction<_State[_Key]>>
        >
        : never
}[keyof _State]>;

export const withConfigReducers = <
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
    const { reducers } = config;

    const state = (
        isCallable(config.initialState)
            ? config.initialState()
            : config.initialState
    );

    const modifiedReducers = (create: ReducerCreators<_State>) => ({
        ...(
            Object.keys<typeof state>(state)
                .reduce<Setters<_State>>((acc, cur) => {
                    const name = `set${capitalize(cur)}`;

                    // @ts-expect-error
                    acc[name] = create.reducer<
                        Draft<_State>[typeof cur]
                    >((state, action) => {
                        state[cur] = action.payload;
                    });

                    return acc;
                }, {})
        ),
        ...(
            isCallable(reducers)
                ? reducers(create)
                : reducers
        ),
    });

    return {
        ...config,
        reducers: modifiedReducers,
    };
};