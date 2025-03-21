import { createAdapterSelectors } from '@/store/utils';
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