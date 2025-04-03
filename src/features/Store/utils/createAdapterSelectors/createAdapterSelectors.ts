import { ReduxToolkit } from '@/libs';
import { WithId } from '@/types';
import { createSelector } from '@/store/utils';
import { StoreTypes } from '@/store/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';



// type EntityAdapterSelectors<_State extends WithId> = {
//     selectIds: (
//         rootState: StoreTypes.State
//     ) => _State['id'][];

//     selectEntities: (
//         rootState: StoreTypes.State
//     ) => Record<_State['id'], _State>;

//     selectAll: (
//         rootState: StoreTypes.State
//     ) => _State[];

//     selectById: (id: _State['id'] | undefined) => (
//         rootState: StoreTypes.State,
//     ) => _State | undefined;

//     selectByIds: (...ids: _State['id'][]) => (
//         rootState: StoreTypes.State,
//     ) => _State[];

//     selectTotal: (
//         rootState: StoreTypes.State
//     ) => number;

//     selectUndefinedIdsByIds: (...ids: _State['id'][]) => (
//         rootState: StoreTypes.State,
//     ) => _State['id'][];
// };

export const createAdapterSelectors = <
    _Slice extends T.ValueOf<StoreTypes.SlicesWithEntityAdapter>,
    _State extends StoreTypes.ExtractStateFromSliceWithEntityAdapter<_Slice>,
>(
    slice: _Slice,
) => {
    const sliceName = slice.name;

    const getState = (rootState: StoreTypes.State) => {
        return slice.selectSlice(rootState) as (
            ReduxToolkit.EntityState<_State, _State['id']>
        );
    };

    const selectIds = createSelector.simple((rootState) => {
        return getState(rootState).ids;
    }, `${sliceName}/selectIds`);

    const selectEntities = createSelector.simple((rootState) => {
        return getState(rootState).entities;
    }, `${sliceName}/selectEntities`);

    const selectAll = createSelector((query) => {
        const ids = query(selectIds);
        const entities = query(selectEntities);

        return ids.map((id) => entities[id]) as _State[];
    }, `${sliceName}/selectAll`);

    const selectById = createSelector.withParams(
        (id: _State['id'] | undefined) => {
            return (query) => {
                if (!id) return;

                const entities = query(selectEntities);

                return entities[id];
            };
        }, `${sliceName}/selectById`,
    );

    const selectIsExistsById = createSelector.withParams(
        (id: _State['id'] | undefined) => {
            return (query): boolean => {
                if (!id) return false;

                const entities = query(selectEntities);

                return !!entities[id].id;
            };
        }, `${sliceName}/selectIsExistsById`,
    );

    const selectByIds = createSelector.withParams(
        (...ids: _State['id'][]) => {
            return (query) => {
                if (!ids) return [];

                const entities = query(selectEntities);

                return ids.map((id) => entities[id]).filter(Boolean);
            };
        },
        `${sliceName}/selectByIds`,
    );

    const selectTotal = createSelector((query) => {
        const ids = query(selectIds);

        return ids.length;
    }, `${sliceName}/selectTotal`);

    const selectUndefinedIdsByIds = createSelector.withParams(
        (...ids: _State['id'][]) => {
            return (query) => {
                if (!ids) return [];

                const entities = query(selectEntities);

                return ids.filter((id) => !entities[id]);
            };
        },
        `${sliceName}/selectUndefinedIdsByIds`,
    );

    return {
        selectIds,
        selectEntities,
        selectAll,
        selectById,
        selectIsExistsById,
        selectByIds,
        selectTotal,
        selectUndefinedIdsByIds,
    };
};