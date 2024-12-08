import { T } from '@lesnoypudge/types-utils-base/namespace';
import { createEntityAdapter, EntityAdapter } from '@reduxjs/toolkit';
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

    export type Return<_State extends WithId> = (
        EntityAdapter<_State, _State['id']>
        & {
            reducers: Reducers<_State>;
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

    return {
        ...adapter,
        reducers,
    };
};