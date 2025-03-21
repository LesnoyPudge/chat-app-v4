import { createAdapterSelectors } from '@/store/utils';
import { MessagesSlice } from './MessagesSlice';



export const {
    selectAll,
    selectById,
    selectByIds,
    selectEntities,
    selectIds,
    selectTotal,
    selectUndefinedIdsByIds,
} = createAdapterSelectors(MessagesSlice);