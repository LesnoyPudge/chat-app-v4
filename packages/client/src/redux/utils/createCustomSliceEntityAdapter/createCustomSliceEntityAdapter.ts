import {
    asyncThunkCreator,
    buildCreateSlice,
    CreateSliceOptions,
    EntityState,
    ReducerCreators,
    SliceCaseReducers,
    SliceSelectors,
} from '@reduxjs/toolkit';
import { withSliceSelectors } from '../enhancers';
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
        reducers,
        selectors = {} as _Selectors,
    } = config;

    const getOriginalReducers = (create: ReducerCreators<_State>) => (
        isCallable(reducers)
            ? reducers(create)
            : reducers
    );

    const slice = buildCreateSlice({
        creators: { asyncThunk: asyncThunkCreator },
    })({
        ...config,
        reducers: (create) => ({
            ...adapter.reducers,
            ...getOriginalReducers(create),
        }),
        selectors: {
            ...adapter.entitySelectors,
            ...selectors,
        },
    });

    return withSliceSelectors(slice);
};