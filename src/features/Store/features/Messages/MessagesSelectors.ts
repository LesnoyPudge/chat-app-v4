import { createAdapterFieldSelectors, createAdapterSelectors } from '@/store/utils';
import { MessagesSlice } from './MessagesSlice';



export const {
    selectAll,
    selectById,
    selectByIds,
    selectEntities,
    selectIds,
    selectTotal,
    selectUndefinedIdsByIds,
    selectIsExistsById,
} = createAdapterSelectors(MessagesSlice);

export const {
    selectIndexById,
} = createAdapterFieldSelectors({
    keys: ['index'],
    selectById,
    slice: MessagesSlice,
});