import { T } from '@lesnoypudge/types-utils-base/namespace';
import { capitalize, isCallable } from '@lesnoypudge/utils';
import {
    ActionCreatorWithPayload,
    asyncThunkCreator,
    buildCreateSlice,
    CaseReducer,
    CreateSliceOptions,
    PayloadAction,
    ReducerCreators,
    Slice,
    SliceCaseReducers,
    SliceSelectors,
} from '@reduxjs/toolkit';



type createCustomSlice = <
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string,
    Selectors extends SliceSelectors<State>,
    ReducerPath extends string = Name,
>(
    options: CreateSliceOptions<
        State,
        CaseReducers,
        Name,
        ReducerPath,
        Selectors
    >
) => Slice<
    State,
    CaseReducers,
    Name,
    ReducerPath,
    Selectors
>;

type Setters<
    _State extends T.UnknownRecord,
> = {
    [_Key in keyof _State]: _Key extends string
        // ? Record<`set${Capitalize<_Key>}`, ActionCreatorWithPayload<
        //     _State[_Key],
        //     `${_Name}/${_Key}`
        // >>
        ? Record<
            `set${Capitalize<_Key>}`,
            CaseReducer<
                _State,
                PayloadAction<_State[_Key]>
            >
        >
        /// / eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
        // ? {
        //         [_K in `set${Capitalize<_Key>}`]: ReducerCreators<
        //             _State
        //         >['reducer'];
        //     }
        : never
}[keyof _State];

// type qwe = Setters<{
//     some: string;
// }, 'SomeSlice'>;

const createSetters = <
    _State extends T.UnknownRecord,
>(initialState: _State) => {
    return (
        Object.keys<_State>(initialState)
            .reduce<Setters<_State>>((acc, cur) => {
                // @ts-expect-error
                acc[`set${capitalize(cur)}`] = (state, action) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                    state[cur] = action.payload;
                };

                return acc;
            }, {})
    );
};

const createCustomSlice2 = <
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
): Slice<
    State,
    CaseReducers & Setters<State>,
    Name,
    ReducerPath,
    Selectors
> => {
    return {} as any;
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
): Slice<
    State,
    CaseReducers & T.Simplify<Setters<State>>,
    Name,
    ReducerPath,
    Selectors
> => {
    const setters = createSetters<State>(
        isCallable(config.initialState)
            ? config.initialState()
            : config.initialState,
    );

    const reducers = (create: ReducerCreators<State>) => {
        return (
            isCallable(config.reducers)
                ? config.reducers(create)
                : config.reducers
        );
    };

    config.reducers = (create) => ({
        ...setters,
        ...reducers(create),
    });

    // @ts-expect-error
    return buildCreateSlice({
        creators: { asyncThunk: asyncThunkCreator },
    })(config);
};
export type State = {
    isInitialized: boolean;
    isRefreshing: boolean;
    isNetworkConnected: boolean;
    isSocketConnected: boolean;
    isMute: boolean;
    isDeaf: boolean;
    isMobileScreen: boolean;
};

export const getInitialState = (): State => {
    return {
        isDeaf: false,
        isMute: false,
        isInitialized: false,
        isMobileScreen: false,
        isNetworkConnected: navigator.onLine,
        isRefreshing: false,
        isSocketConnected: false,
    };
};
const qwe = createCustomSlice({
    name: 'Qwe',
    initialState: getInitialState(),
    reducers: (create) => ({
        da: create.reducer((state, { payload }: PayloadAction<string>) => {}),
    }),
});

const zxc = createCustomSlice({
    name: 'Qwe',
    initialState: {
        isDeaf: false,
        isMute: false,

    },
    reducers: (create) => ({
        da: create.reducer((state, { payload }: PayloadAction<string>) => {}),
    }),
});

qwe.actions.setIsDeaf;
zxc.actions.setIsDeaf;