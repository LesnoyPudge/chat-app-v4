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
    State extends T.UnknownRecord,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string,
    Selectors extends SliceSelectors<State>,
    ReducerPath extends string = Name,
>(
    config: CreateSliceOptions<
        State,
        CaseReducers,
        Name,
        ReducerPath,
        Selectors
    >,
) => {
    const {
        reducers,
        initialState,
        selectors = {} as Selectors,
    } = config;

    const getOriginalReducers = (create: ReducerCreators<State>) => (
        isCallable(reducers)
            ? reducers(create)
            : reducers
    );

    const state = (
        isCallable(initialState)
            ? initialState()
            : initialState
    );

    return buildCreateSlice({
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
};