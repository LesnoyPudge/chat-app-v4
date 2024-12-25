import { T } from '@lesnoypudge/types-utils-base/namespace';
import {
    createEntityAdapter,
    EntityAdapter,
    EntitySelectors,
    EntityState,
} from '@reduxjs/toolkit';
import { WithId } from '@types';



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
] satisfies (keyof ReturnType<typeof createEntityAdapter<WithId>>)[];

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
                    payload: _State;
                }
            ) => ReturnType<EntityAdapter<_State, string>[_Key]>
        )
    };

    export type SelectsByIds<_State extends WithId> = (
        state: EntityState<_State, _State['id']>,
        ids: string[],
    ) => _State[];

    export type GetSelectors<_State extends WithId> = () => (
        EntitySelectors<
            _State,
            EntityState<_State, _State['id']>,
            _State['id']
        >
        & {
            // disabled to enforce better practices
            // selectByIds: SelectsByIds<_State>;
        }
    );

    export type Return<_State extends WithId> = (
        T.Except<
            EntityAdapter<_State, _State['id']>,
            'getSelectors'
        >
        & {
            reducers: Reducers<_State>;
            extraReducers: ExtraReducers<_State>;
            getSelectors: GetSelectors<_State>;
        }
    );
}

export const createCustomEntityAdapter = <
    _State extends WithId,
>(): createCustomEntityAdapter.Return<_State> => {
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

    const getSelectors: createCustomEntityAdapter.GetSelectors<_State> = () => {
        const defaultSelectors = adapter.getSelectors();

        const selectByIds: createCustomEntityAdapter.SelectsByIds<_State> = (
            state: EntityState<_State, _State['id']>,
            ids: string[],
        ) => {
            return ids.map((id) => {
                return defaultSelectors.selectById(state, id);
            }).filter(Boolean);
        };

        return {
            ...defaultSelectors,
            selectByIds,
        };
    };

    return {
        ...adapter,
        reducers,
        extraReducers,
        getSelectors,
    };
};