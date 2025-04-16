import { createAdapterFieldSelectors, createAdapterSelectors, createSelector } from '@/store/utils';
import { App } from '@/store/features';
import { invariant } from '@lesnoypudge/utils';
import { UsersSlice } from './UsersSlice';
import { derivePresenceStatus } from '@/utils';



export const {
    selectAll,
    selectById,
    selectByIds,
    selectEntities,
    selectIds,
    selectTotal,
    selectUndefinedIdsByIds,
    selectIsExistsById,
} = createAdapterSelectors(UsersSlice);

export const {
    selectExtraStatusById,
    selectStatusById,
    selectNameById,
} = createAdapterFieldSelectors({
    keys: ['status', 'extraStatus', 'name'],
    selectById,
    slice: UsersSlice,
});

export const selectCurrentUserId = createSelector((query) => {
    const id = query(App.Selectors.selectUserId);
    invariant(id, 'Failed to select current user id');

    return id;
}, `${UsersSlice.name}/selectCurrentUserId`);

export const selectCurrentUser = createSelector((query) => {
    const id = query(selectCurrentUserId);

    const user = query(selectById(id));
    invariant(user, 'Failed to select current user while not authorized');

    return user;
}, `${UsersSlice.name}/selectCurrentUser`);

export const selectCurrentUserFriendIds = createSelector((query) => {
    const user = query(selectCurrentUser);

    return user.friends;
}, `${UsersSlice.name}/selectCurrentUserFriendIds`);

export const selectCurrentUserOnlineFriendIds = createSelector((query) => {
    const user = query(selectCurrentUser);
    const friends = query(selectByIds(...user.friends));

    return friends.filter((friend) => derivePresenceStatus({
        status: friend.status,
        extraStatus: friend.extraStatus,
    }) !== 'offline').map((friend) => friend.id);
}, `${UsersSlice.name}/selectCurrentUserOnlineFriendIds`);

export const selectCurrentUserBlockedIds = createSelector((query) => {
    const user = query(selectCurrentUser);

    return user.blocked;
}, `${UsersSlice.name}/selectCurrentUserBlockedIds`);

export const selectCurrentUserIncomingRequestUserIds = (
    createSelector((query) => {
        const user = query(selectCurrentUser);

        return user.incomingFriendRequests.map((v) => v.from);
    }, `${UsersSlice.name}/selectCurrentUserIncomingRequestUserIds`)
);

export const selectCurrentUserOutgoingRequestUserIds = (
    createSelector((query) => {
        const user = query(selectCurrentUser);

        return user.outgoingFriendRequests.map((v) => v.to);
    }, `${UsersSlice.name}/selectCurrentUserOutgoingRequestUserIds`)
);

export const selectPresenceStatusById = (
    createSelector.withParams((userId: string) => (query) => {
        const extraStatus = query(selectExtraStatusById(userId));
        const status = query(selectStatusById(userId));

        if (!extraStatus || !status) return 'offline';

        return derivePresenceStatus({ extraStatus, status });
    }, `${UsersSlice.name}/selectPresenceStatusById`)
);

export const selectIsNotOfflineById = (
    createSelector.withParams((userId: string) => (query) => {
        const status = query(selectPresenceStatusById(userId));

        return status !== 'offline';
    }, `${UsersSlice.name}/selectIsNotOfflineById`)
);

export const selectIsOfflineById = (
    createSelector.withParams((userId: string) => (query) => {
        const status = query(selectPresenceStatusById(userId));

        return status === 'offline';
    }, `${UsersSlice.name}/selectIsOfflineById`)
);