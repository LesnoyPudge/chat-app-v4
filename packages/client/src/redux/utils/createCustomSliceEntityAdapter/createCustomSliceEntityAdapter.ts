import { T } from '@lesnoypudge/types-utils-base/namespace';
import {
    asyncThunkCreator,
    buildCreateSlice,
    CreateSliceOptions,
    EntityAdapter,
    EntityState,
    ReducerCreators,
    SliceCaseReducers,
    SliceSelectors,
} from '@reduxjs/toolkit';
import { modifySelectors } from '../modifySelectors';
import { isCallable } from '@lesnoypudge/utils';
import { createCustomEntityAdapter } from '../createCustomEntityAdapter';
import { WithId } from '@types';



export const createCustomSliceEntityAdapter = <
    _EntityState extends WithId,
    _State extends EntityState<_EntityState, string>,
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
    adapter: createCustomEntityAdapter.Return<_EntityState>,
) => {
    const {
        selectors = {} as _Selectors,
        reducers,
    } = config;

    const getOriginalReducers = (create: ReducerCreators<_State>) => (
        isCallable(reducers)
            ? reducers(create)
            : reducers
    );

    const adapterSelectors = adapter.getSelectors();

    const slice = buildCreateSlice({
        creators: { asyncThunk: asyncThunkCreator },
    })({
        ...config,
        reducers: (create) => ({
            ...adapter.reducers,
            ...getOriginalReducers(create),
        }),
        selectors: {
            ...adapterSelectors,
            ...selectors,
        },
    });

    return modifySelectors(slice);
};