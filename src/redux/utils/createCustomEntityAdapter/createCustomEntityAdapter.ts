import { T } from '@lesnoypudge/types-utils-base/namespace';
import { pick, capitalize } from '@lesnoypudge/utils';
import { RootState, Slices } from '@/redux/store';
import {
    createEntityAdapter,
    EntityAdapter,
    EntityState,
    PayloadAction,
} from '@reduxjs/toolkit';
import { WithId } from '@/types';



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
] as const satisfies (keyof EntityAdapter<WithId, WithId['id']>)[];

type ActionNames = typeof actionNames;

export namespace createCustomEntityAdapter {
    export type Reducers<_State extends WithId> = {
        [_Key in T.TupleToUnion<ActionNames>]: (
            EntityAdapter<_State, _State['id']>[_Key]
        )
    };

    export type ExtraReducers<_State extends WithId> = {
        [_Key in T.ArrayValues<ActionNames>]: (
            (
                state: Parameters<EntityAdapter<_State, _State['id']>[_Key]>[0],
                props: {
                    payload: (
                        Parameters<
                            EntityAdapter<_State, _State['id']>[_Key]
                        >[1] extends PayloadAction<infer _Payload>
                            ? _Payload
                            : Parameters<
                                EntityAdapter<_State, _State['id']>[_Key]
                            >[1]
                    );
                }
            ) => ReturnType<EntityAdapter<_State, _State['id']>[_Key]>
        )
    };

    export type BaseEntitySelectors<_State extends WithId> = {
        selectIds: (
            entityState: EntityState<_State, _State['id']>
        ) => _State['id'][];

        selectEntities: (
            entityState: EntityState<_State, _State['id']>
        ) => Record<_State['id'], _State>;

        selectAll: (
            entityState: EntityState<_State, _State['id']>
        ) => _State[];

        selectById: (
            entityState: EntityState<_State, _State['id']>,
            id: _State['id'] | undefined
        ) => _State | undefined;

        selectByIds: (
            entityState: EntityState<_State, _State['id']>,
            ids: _State['id'][] | undefined
        ) => _State[];

        selectTotal: (
            entityState: EntityState<_State, _State['id']>
        ) => number;

        selectUndefinedIdsByIds: (
            entityState: EntityState<_State, _State['id']>,
            ids: _State['id'][] | undefined
        ) => _State['id'][];
    };

    export type StateEntitySelectors<
        _State extends WithId,
        _Keys extends keyof _State,
    > = {
        [_Key in _Keys as (
            _Key extends string
                ? `selectFilteredBy${Capitalize<_Key>}`
                : never
        )]: (
            (
                entityState: EntityState<_State, _State['id']>,
                props: _State[_Key]
            ) => _State[]
        );
    };

    export type CustomEntitySelectors<
        _State extends WithId,
        _Keys extends keyof _State,
    > = (
        BaseEntitySelectors<_State>
        & StateEntitySelectors<_State, _Keys>
    );

    export type CustomStoreSelectors<
        _State extends WithId,
        _Keys extends keyof _State,
    > = {
        [_Key in keyof CustomEntitySelectors<_State, _Keys>]: (
            CustomEntitySelectors<_State, _Keys>[_Key] extends T.AnyFunction
                ? (
                        rootState: RootState,
                        props: (
                            T.IsEqual<
                                Parameters<
                                    CustomEntitySelectors<_State, _Keys>[_Key]
                                >['length'],
                                2
                            > extends true
                                ? Parameters<
                                    CustomEntitySelectors<_State, _Keys>[_Key]
                                >[1]
                                : void
                        )
                    ) => ReturnType<CustomEntitySelectors<_State, _Keys>[_Key]>
                : never
        );
    };

    export type Return<
        _State extends WithId,
        _Keys extends keyof _State,
    > = (
        T.Except<
            EntityAdapter<_State, _State['id']>,
            'getSelectors'
        >
        & {
            reducers: Reducers<_State>;
            extraReducers: ExtraReducers<_State>;
            entitySelectors: CustomEntitySelectors<_State, _Keys>;
            storeSelectors: CustomStoreSelectors<_State, _Keys>;
        }
    );
}

export const createCustomEntityAdapter = <
    _State extends WithId,
>() => <
    _Name extends keyof T.Except<Slices, 'App'>,
    _Keys extends keyof _State,
>(
    name: _Name,
    keys: _Keys[],
): createCustomEntityAdapter.Return<_State, _Keys> => {
    const adapter = createEntityAdapter<_State>();

    const reducers: createCustomEntityAdapter.Reducers<_State> = pick(
        adapter,
        ...actionNames,
    );

    const extraReducers = actionNames.reduce<
        createCustomEntityAdapter.ExtraReducers<_State>
    >((acc, cur) => {
        // @ts-expect-error
        // eslint-disable-next-line @/typescript-eslint/no-unsafe-return
        acc[cur] = (state, { payload }) => adapter[cur](state, payload);

        return acc;
    }, {});

    const selectSliceState = (rootState: RootState) => {
        // assume that name is the same as in slice
        return rootState[name] as unknown as EntityState<
            _State,
            _State['id']
        >;
    };

    const baseSelectors: createCustomEntityAdapter.BaseEntitySelectors<
        _State
    > = {
        selectIds: (entityState) => {
            return entityState.ids;
        },

        selectEntities: (entityState) => {
            return entityState.entities;
        },

        selectAll: (entityState) => {
            const ids = baseSelectors.selectIds(entityState);
            const entities = baseSelectors.selectEntities(entityState);

            return ids.map((id) => entities[id]);
        },

        selectById: (entityState, id) => {
            if (!id) return;

            const entities = baseSelectors.selectEntities(entityState);

            return entities[id];
        },

        selectByIds: (entityState, ids) => {
            if (!ids) return [];

            const entities = baseSelectors.selectEntities(entityState);

            return ids.map((id) => entities[id]);
        },

        selectTotal: (entityState) => {
            const ids = baseSelectors.selectIds(entityState);

            return ids.length;
        },

        selectUndefinedIdsByIds: (entityState, ids) => {
            if (!ids) return [];

            return ids.filter((id) => !entityState.entities[id]);
        },
    };

    const stateSelectors = keys.reduce<
        createCustomEntityAdapter.StateEntitySelectors<_State, _Keys>
    >((acc, cur) => {
        const key = `selectFilteredBy${capitalize(String(cur))}`;

        // @ts-expect-error
        acc[key] = (entityState, compareWith) => {
        // eslint-disable-next-line @/typescript-eslint/no-unsafe-argument
            return baseSelectors.selectAll(entityState).filter((entity) => {
                if (!(cur in entity)) return false;

                return entity[cur] === compareWith;
            });
        };

        return acc;
    }, {});

    const entitySelectors: createCustomEntityAdapter.CustomEntitySelectors<
        _State,
        _Keys
    > = {
        ...baseSelectors,
        ...stateSelectors,
    };

    const selectorKeys = Object.keys<typeof entitySelectors>(
        entitySelectors,
    );

    const storeSelectors = selectorKeys.reduce<
        createCustomEntityAdapter.CustomStoreSelectors<_State, _Keys>
    >((acc, cur) => {
    // @ts-expect-error
        acc[cur] = (rootState, props) => {
        // @ts-expect-error
        // eslint-disable-next-line @/typescript-eslint/no-unsafe-return, @/typescript-eslint/no-unsafe-call
            return entitySelectors[cur](
            // eslint-disable-next-line @/typescript-eslint/no-unsafe-argument
                selectSliceState(rootState),
                props,
            );
        };

        return acc;
    }, {});

    return {
        ...adapter,
        reducers,
        extraReducers,
        entitySelectors,
        storeSelectors,
    };
};