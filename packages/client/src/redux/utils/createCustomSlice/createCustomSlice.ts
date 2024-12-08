
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { capitalize, isCallable } from '@lesnoypudge/utils';
import {
    asyncThunkCreator,
    buildCreateSlice,
    CaseReducer,
    CreateSliceOptions,
    Draft,
    PayloadAction,
    ReducerCreators,
    SliceCaseReducers,
    SliceSelectors,
} from '@reduxjs/toolkit';
import { modifySelectors } from '../modifySelectors';



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

const createSetters = <
    _State extends T.UnknownRecord,
>(
    initialState: _State,
    create: ReducerCreators<_State>,
): Setters<_State> => {
    return (
        Object.keys<_State>(initialState)
            .reduce<Setters<_State>>((acc, cur) => {
                const name = `set${capitalize(cur)}`;

                // @ts-expect-error
                acc[name] = create.reducer<
                    Draft<_State>[typeof cur]
                >((
                    state,
                    action,
                ) => {
                    state[cur] = action.payload;
                });

                return acc;
            }, {})
    );
};

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

const createSelectors = <
    _State extends T.UnknownRecord,
>(
    initialState: _State,
): Selectors<_State> => {
    return (
        Object.keys<_State>(initialState)
            .reduce<Selectors<_State>>((acc, cur) => {
                const name = `select${capitalize(cur)}`;

                // @ts-expect-error
                acc[name] = (state: _State) => {
                    return state[cur];
                };

                return acc;
            }, {})
    );
};


export const createCustomSlice = <
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
    const {
        reducers,
        initialState,
        selectors = {} as _Selectors,
    } = config;

    const getOriginalReducers = (create: ReducerCreators<_State>) => (
        isCallable(reducers)
            ? reducers(create)
            : reducers
    );

    const state = (
        isCallable(initialState)
            ? initialState()
            : initialState
    );

    const slice = buildCreateSlice({
        creators: { asyncThunk: asyncThunkCreator },
    })({
        ...config,
        reducers: (create) => ({
            ...createSetters(state, create),
            ...getOriginalReducers(create),
        }),
        selectors: {
            ...createSelectors(state),
            ...selectors,
        },
    });

    return modifySelectors(slice);
};