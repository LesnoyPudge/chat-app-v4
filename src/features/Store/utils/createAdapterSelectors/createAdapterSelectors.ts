import { ReduxToolkit } from '@/libs';
import { createSelector } from '@/store/utils';
import { StoreTypes } from '@/store/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';



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
                const entities = query(selectEntities);

                if (!id) return;

                return entities[id];
            };
        }, `${sliceName}/selectById`,
    );

    const selectIsExistsById = createSelector.withParams(
        (id: _State['id'] | undefined) => {
            return (query): boolean => {
                const entities = query(selectEntities);

                if (!id) return false;

                return id in entities;
            };
        }, `${sliceName}/selectIsExistsById`,
    );

    const selectByIds = createSelector.withParams(
        (...ids: _State['id'][]) => {
            return (query) => {
                const entities = query(selectEntities);

                if (!ids) return [];

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
                const entities = query(selectEntities);

                if (!ids) return [];

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