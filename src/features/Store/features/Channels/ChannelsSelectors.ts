import { createAdapterFilterSelectors, createAdapterSelectors, createSelector } from '@/store/utils';
import { ChannelsSlice } from './ChannelsSlice';



export const {
    selectAll,
    selectById,
    selectByIds,
    selectEntities,
    selectIds,
    selectTotal,
    selectUndefinedIdsByIds,
} = createAdapterSelectors(ChannelsSlice);

export const {
    selectFilteredByServer,
} = createAdapterFilterSelectors({
    keys: ['server'],
    slice: ChannelsSlice,
    selectAll,
});

export const selectAvailableByServerId = (
    createSelector.withParams((serverId: string) => (query) => {
        const channels = query(selectFilteredByServer(serverId));
        if (!channels.length) return;

        // find text channel that i can join
    }, `${ChannelsSlice.name}/selectAvailableByServerId`)
);