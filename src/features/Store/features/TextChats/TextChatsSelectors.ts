import { createAdapterFilterSelectors, createAdapterSelectors } from '@/store/utils';
import { TextChatsSlice } from './TextChatsSlice';



export const {
    selectAll,
    selectById,
    selectByIds,
    selectEntities,
    selectIds,
    selectTotal,
    selectUndefinedIdsByIds,
} = createAdapterSelectors(TextChatsSlice);

export const {
    selectFilteredByConversation,
    selectFilteredByServer,
} = createAdapterFilterSelectors({
    keys: ['server', 'conversation'],
    slice: TextChatsSlice,
    selectAll,
});