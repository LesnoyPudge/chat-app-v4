import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RootState, Slices } from '@redux/store';
import {
    createEntityAdapter,
    EntityAdapter,
    EntityState,
} from '@reduxjs/toolkit';
import { WithId } from '@types';


type Adapter = ReturnType<typeof createEntityAdapter<WithId>>;

const actionNames = [
    'addMany',
    'addOne',
    'removeAll',
    'removeMany',
    'removeOne',
    'setAll',
    'setMany',
    'setOne',
    'updateMany',
    'updateOne',
    'upsertMany',
    'upsertOne',
] satisfies (keyof Adapter)[];

type ActionNames = typeof actionNames;

export namespace createCustomEntityAdapter {
    export type Reducers<_State extends WithId> = {
        [_Key in T.ArrayValues<ActionNames>]: (
            EntityAdapter<_State, string>[_Key]
        )
    };

    export type ExtraReducers<_State extends WithId> = {
        [_Key in T.ArrayValues<ActionNames>]: (
            (
                state: Parameters<EntityAdapter<_State, string>[_Key]>[0],
                nestedPayload: {
                    payload: (
                        Parameters<Adapter[_Key]>[1] extends {
                            payload: infer _Payload;
                        }
                            ? Parameters<Adapter[_Key]>[1]['payload']
                            : Parameters<Adapter[_Key]>[1]
                    );
                }
            ) => ReturnType<EntityAdapter<_State, string>[_Key]>
        )
    };

    export type CustomEntitySelectors<_State extends WithId> = {
        selectIds: (
            entityState: EntityState<_State, _State['id']>
        ) => _State['id'][];
        selectEntities: (
            entityState: EntityState<_State, _State['id']>
        ) => Record<_State['id'], _State>;
        selectAll: (
            entityState: EntityState<_State, _State['id']>
        ) => Record<_State['id'], _State>[_State['id']][];
        selectById: (
            entityState: EntityState<_State, _State['id']>,
            id: _State['id']
        ) => Record<_State['id'], _State>[_State['id']] | undefined;
        selectByIds: (
            entityState: EntityState<_State, _State['id']>,
            ids: _State['id'][]
        ) => Record<_State['id'], _State>[_State['id']][];
        selectTotal: (
            entityState: EntityState<_State, _State['id']>
        ) => number;
    };

    export type CustomStoreSelectors<_State extends WithId> = {
        selectIds: (
            rootState: RootState
        ) => _State['id'][];
        selectEntities: (
            rootState: RootState
        ) => Record<_State['id'], _State>;
        selectAll: (
            rootState: RootState
        ) => Record<_State['id'], _State>[_State['id']][];
        selectById: (
            rootState: RootState,
            id: _State['id']
        ) => Record<_State['id'], _State>[_State['id']] | undefined;
        selectByIds: (
            rootState: RootState,
            ids: _State['id'][]
        ) => Record<_State['id'], _State>[_State['id']][];
        selectTotal: (
            rootState: RootState
        ) => number;
    };

    export type Return<_State extends WithId> = (
        T.Except<
            EntityAdapter<_State, _State['id']>,
            'getSelectors'
        >
        & {
            reducers: Reducers<_State>;
            extraReducers: ExtraReducers<_State>;
            entitySelectors: CustomEntitySelectors<_State>;
            storeSelectors: CustomStoreSelectors<_State>;
        }
    );
}

export const createCustomEntityAdapter = <
    _State extends WithId,
    _Name extends keyof T.Except<Slices, 'App'>,
>(
    name: _Name,
): createCustomEntityAdapter.Return<_State> => {
    const adapter = createEntityAdapter<_State>();

    const reducers = actionNames.reduce<
        createCustomEntityAdapter.Reducers<_State>
    >((acc, cur) => {
        // @ts-expect-error
        acc[cur] = adapter[cur];

        return acc;
    }, {});

    const extraReducers = actionNames.reduce<
        createCustomEntityAdapter.ExtraReducers<_State>
    >((acc, cur) => {
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        acc[cur] = (state, { payload }) => adapter[cur](state, payload);

        return acc;
    }, {});

    const selectSliceState = (rootState: RootState) => {
        // assume that name is same as in slice
        return rootState[name] as unknown as EntityState<
            _State,
            _State['id']
        >;
    };

    const entitySelectors: createCustomEntityAdapter.CustomEntitySelectors<
        _State
    > = {
        selectIds: (entityState) => {
            return entityState.ids;
        },

        selectEntities: (entityState) => {
            return entityState.entities;
        },

        selectAll: (entityState) => {
            const ids = entitySelectors.selectIds(entityState);
            const entities = entitySelectors.selectEntities(entityState);

            return ids.map((id) => entities[id]);
        },

        selectById: (entityState, id) => {
            const entities = entitySelectors.selectEntities(entityState);

            return entities[id];
        },

        selectByIds: (entityState, ids) => {
            const entities = entitySelectors.selectEntities(entityState);

            return ids.map((id) => entities[id]);
        },

        selectTotal: (entityState) => {
            const ids = entitySelectors.selectIds(entityState);

            return ids.length;
        },
    };

    const storeSelectors: createCustomEntityAdapter.CustomStoreSelectors<
        _State
    > = {
        selectIds: (rootState) => {
            return entitySelectors.selectIds(selectSliceState(rootState));
        },

        selectEntities: (rootState) => {
            return entitySelectors.selectEntities(selectSliceState(rootState));
        },

        selectAll: (rootState) => {
            return entitySelectors.selectAll(selectSliceState(rootState));
        },

        selectById: (rootState, id) => {
            return entitySelectors.selectById(
                selectSliceState(rootState),
                id,
            );
        },

        selectByIds: (rootState, ids) => {
            return entitySelectors.selectByIds(
                selectSliceState(rootState),
                ids,
            );
        },

        selectTotal: (rootState) => {
            return entitySelectors.selectTotal(selectSliceState(rootState));
        },
    };

    return {
        ...adapter,
        reducers,
        extraReducers,
        entitySelectors,
        storeSelectors,
    };
};