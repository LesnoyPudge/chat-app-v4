import { createAdapterFieldSelectors, createAdapterFilterSelectors, createAdapterSelectors, createSelector } from '@/store/utils';
import { ChannelsSlice } from './ChannelsSlice';
import { ClientEntities } from '@/types';



export const {
    selectAll,
    selectById,
    selectByIds,
    selectEntities,
    selectIds,
    selectTotal,
    selectUndefinedIdsByIds,
    selectIsExistsById,
} = createAdapterSelectors(ChannelsSlice);

export const {
    selectFilteredByServer,
} = createAdapterFilterSelectors({
    keys: ['server'],
    slice: ChannelsSlice,
    selectAll,
});

export const {
    selectTextChatById,
} = createAdapterFieldSelectors({
    keys: ['textChat'],
    slice: ChannelsSlice,
    selectById,
});

// role calculations are omitted for simplicity
export const selectAvailableTextChannelIdByServerId = (
    createSelector.withParams((serverId: string | undefined) => (query) => {
        if (!serverId) return;

        const channels = query(selectFilteredByServer(serverId));
        if (!channels.length) return;

        return channels.find((v) => v.textChat)?.id;
    }, `${ChannelsSlice.name}/selectAvailableByServerId`)
);