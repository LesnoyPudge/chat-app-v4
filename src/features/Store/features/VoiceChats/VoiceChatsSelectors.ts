import { createAdapterSelectors } from '@/store/utils';
import { VoiceChatsSlice } from './VoiceChatsSlice';



export const {
    selectAll,
    selectById,
    selectByIds,
    selectEntities,
    selectIds,
    selectTotal,
    selectUndefinedIdsByIds,
} = createAdapterSelectors(VoiceChatsSlice);