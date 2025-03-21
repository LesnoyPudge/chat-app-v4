import { ReduxToolkit } from '@/libs';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { capitalize } from '@lesnoypudge/utils';



type Setters<
    _State extends T.UnknownRecord,
> = T.UnionToIntersection<{

    [_Key in keyof _State]: _Key extends string
        ? Record<
            `set${Capitalize<_Key>}`,
            ReduxToolkit.CaseReducer<_State, ReduxToolkit.PayloadAction<_State[_Key]>>
        >
        : never
}[keyof _State]>;

type Options<
    _State extends T.UnknownRecord,
    _Reducers extends ReduxToolkit.SliceCaseReducers<_State>,
> = {
    initialState: _State;
    reducers: (creators: ReduxToolkit.ReducerCreators<_State>) => _Reducers;
};

export const withStateReducers = <
    _State extends T.UnknownRecord,
    _Reducers extends ReduxToolkit.SliceCaseReducers<_State>,
>({
    initialState,
    reducers,
}: Options<_State, _Reducers>) => {
    const modifiedReducers = (create: ReduxToolkit.ReducerCreators<_State>) => {
        const stateReducers = {} as Setters<_State>;

        for (const key of Object.keys(initialState)) {
            const name = `set${capitalize(key)}`;

            const reducer = create.reducer<
                ReduxToolkit.Draft<_State>[typeof key]
            >((state, action) => {
                state[key as keyof _State] = action.payload;
            });

            Object.assign(stateReducers, {
                [name]: reducer,
            });
        }

        return {
            ...stateReducers,
            ...reducers(create),
        };
    };

    return modifiedReducers;
};