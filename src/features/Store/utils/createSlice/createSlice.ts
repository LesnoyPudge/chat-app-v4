import { ReduxToolkit } from '@/libs';
import { addStatsToSelectors, withStateReducers, withStateSelectors } from './utils';
import { T } from '@lesnoypudge/types-utils-base/namespace';



type Options<
    _Name extends string,
    _State extends T.AnyRecord,
    _Reducers extends ReduxToolkit.SliceCaseReducers<_State>,
    _Selectors extends ReduxToolkit.SliceSelectors<_State>,
> = {
    name: _Name;
    getInitialState: () => _State;
    reducers?: (
        (creators: ReduxToolkit.ReducerCreators<_State>) => _Reducers
    ) | undefined;
    extraReducers?: (
        builder: ReduxToolkit.ActionReducerMapBuilder<_State>
    ) => void;
    selectors?: _Selectors;
};

export const createSlice = <
    _Name extends string,
    _State extends T.AnyRecord,
    _Selectors extends ReduxToolkit.SliceSelectors<_State>,
    _Reducers extends ReduxToolkit.SliceCaseReducers<_State> = T.EmptyObject,
>({
    getInitialState,
    name,
    extraReducers,
    reducers,
    selectors,
}: Options<_Name, _State, _Reducers, _Selectors>) => {
    const initialState = getInitialState();

    const defaultReducers = () => ({} as _Reducers);
    const defaultSelectors = {} as _Selectors;

    const slice = ReduxToolkit.createSlice({
        initialState: getInitialState,
        name,
        reducers: withStateReducers({
            initialState,
            reducers: reducers ?? defaultReducers,
        }),
        selectors: withStateSelectors({
            initialState,
            selectors: selectors ?? defaultSelectors,
        }),
        extraReducers,
        reducerPath: name,
    });

    addStatsToSelectors({
        sliceName: name,
        selectors: slice.selectors,
    });

    return slice;
};