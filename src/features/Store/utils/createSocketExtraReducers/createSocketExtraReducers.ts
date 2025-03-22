import { globalActions } from '@/store/globalActions';
import { WithId } from '@/types';
import { socket } from '@/fakeSocket';
import { ReduxToolkit } from '@/libs';



export const createSocketExtraReducers = <
    _State extends WithId,
>(
    entityName: socket.Names,
    adapter: ReduxToolkit.EntityAdapter<_State, _State['id']>,
    builder: ReduxToolkit.ActionReducerMapBuilder<
        ReduxToolkit.EntityState<_State, _State['id']>
    >,
) => {
    builder.addCase(
        globalActions.addSocketData,
        (state, { payload }) => {
            const newEntities = payload[entityName] as unknown as _State[];

            adapter.upsertMany(state, newEntities);
        },
    );

    builder.addCase(
        globalActions.removeSocketData,
        (state, { payload }) => {
            const idsToRemove = payload[entityName];
            if (!idsToRemove) return;

            adapter.removeMany(state, idsToRemove);
        },
    );
};