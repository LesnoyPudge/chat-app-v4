import { socket } from '@/fakeSocket';
import { useMemoShallow } from '@lesnoypudge/utils-react';
import { ActionReducerMapBuilder, EntityState } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { createCustomEntityAdapter } from '../createCustomEntityAdapter';
import { WithId } from '@/types';
import { socketActions } from '@/redux/actions';
import { createId } from '@lesnoypudge/utils';



export namespace createEntitySubscription {
    export type Names = socket.Names;
}

export const createEntitySubscription = <
    _State extends WithId,
    _Keys extends keyof _State,
>(
    entityName: createEntitySubscription.Names,
    adapter: createCustomEntityAdapter.Return<_State, _Keys>,
) => {
    const createExtraReducers = (
        builder: ActionReducerMapBuilder<EntityState<_State, _State['id']>>,
    ) => {
        builder.addCase(
            socketActions.addSocketData,
            (state, { payload }) => {
                const newEntities = payload[entityName] as unknown as _State[];

                adapter.upsertMany(state, newEntities);
            },
        );

        builder.addCase(
            socketActions.removeSocketData,
            (state, { payload }) => {
                const idsToRemove = payload[entityName];
                if (!idsToRemove) return;

                adapter.removeMany(state, idsToRemove);
            },
        );
    };

    const useSubscribe = (ids: string[] | undefined) => {
        const memoizedIds = useMemoShallow(ids);

        useEffect(() => {
            if (!memoizedIds?.length) return;

            const id = createId();

            return socket.subscribe(id, entityName, memoizedIds);
        }, [memoizedIds]);
    };

    return {
        createExtraReducers,
        Subscription: {
            useSubscribe,
        },
    };
};