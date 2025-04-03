import { createAdapterSelectors } from '@/store/utils';
import { RolesSlice } from './RolesSlice';



export const {
    selectAll,
    selectById,
    selectByIds,
    selectEntities,
    selectIds,
    selectTotal,
    selectUndefinedIdsByIds,
    selectIsExistsById,
} = createAdapterSelectors(RolesSlice);