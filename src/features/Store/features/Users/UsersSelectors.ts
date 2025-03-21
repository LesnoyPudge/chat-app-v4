import { createAdapterSelectors, createSelector } from '@/store/utils';
import { App } from '@/store/features';
import { invariant } from '@lesnoypudge/utils';
import { UsersSlice } from './UsersSlice';



export const {
    selectAll,
    selectById,
    selectByIds,
    selectEntities,
    selectIds,
    selectTotal,
    selectUndefinedIdsByIds,
} = createAdapterSelectors(UsersSlice);


export const selectCurrentUser = createSelector((query) => {
    return query(() => {
        const id = query(App.Selectors.selectUserId);
        invariant(id, 'Failed to select current user id');

        const user = query(selectById(id));
        invariant(user, 'Failed to select current user while not authorized');

        return user;
    });
});