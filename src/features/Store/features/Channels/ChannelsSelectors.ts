import { createAdapterFieldSelectors, createAdapterFilterSelectors, createAdapterSelectors, createSelector } from '@/store/utils';
import { ChannelsSlice } from './ChannelsSlice';



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
    selectNameById,
} = createAdapterFieldSelectors({
    keys: ['textChat', 'name'],
    slice: ChannelsSlice,
    selectById,
});

export const selectIsTextChannelById = (
    createSelector.withParams((channelId: string) => (query) => {
        return !!query(selectTextChatById(channelId));
    }, `${ChannelsSlice.name}/selectIsTextChannelById`)
);

// role calculations are omitted for simplicity
export const selectAvailableTextChannelIdByServerId = (
    createSelector.withParams((serverId: string | undefined) => (query) => {
        if (!serverId) return;

        const channels = query(selectFilteredByServer(serverId));
        if (!channels.length) return;

        return channels.find((v) => v.textChat)?.id;
    }, `${ChannelsSlice.name}/selectAvailableByServerId`)
);