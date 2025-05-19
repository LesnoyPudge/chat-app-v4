import {
    createAdapterFieldSelectors,
    createAdapterSelectors,
    createSelector,
} from '@/store/utils';
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
    selectAvatarById,
    selectDefaultAvatarById,
} = createAdapterFieldSelectors({
    keys: [
        'status',
        'extraStatus',
        'name',
        'avatar',
        'defaultAvatar',
    ],
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

export const selectCurrentServerIds = createSelector((query) => {
    const user = query(selectCurrentUser);

    return user.servers;
}, `${UsersSlice.name}/selectCurrentServerIds`);

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

export const selectCurrentUserSettings = (
    createSelector((query) => {
        const user = query(selectCurrentUser);

        return user.settings;
    }, `${UsersSlice.name}/selectCurrentUserSettings`)
);

export const selectCurrentUserName = (
    createSelector((query) => {
        const user = query(selectCurrentUser);

        return user.name;
    }, `${UsersSlice.name}/selectCurrentUserName`)
);

export const selectCurrentUserBannerColor = (
    createSelector((query) => {
        const user = query(selectCurrentUser);

        return user.bannerColor;
    }, `${UsersSlice.name}/selectCurrentUserBannerColor`)
);

export const selectCurrentUserAvatar = (
    createSelector((query) => {
        const user = query(selectCurrentUser);

        return user.avatar;
    }, `${UsersSlice.name}/selectCurrentUserAvatar`)
);

export const selectCurrentUserPassword = (
    createSelector((query) => {
        const user = query(selectCurrentUser);

        return user.password;
    }, `${UsersSlice.name}/selectCurrentUserPassword`)
);

export const selectCurrentUserDefaultAvatar = (
    createSelector((query) => {
        const user = query(selectCurrentUser);

        return user.defaultAvatar;
    }, `${UsersSlice.name}/selectCurrentUserDefaultAvatar`)
);

export const selectCurrentUserFriendIdsAndNames = (
    createSelector((query) => {
        const user = query(selectCurrentUser);

        const friends = user.friends;

        return friends.map((friendId) => {
            const name = query(selectNameById(friendId));
            if (!name) return;

            return {
                id: friendId,
                name,
            };
        }).filter(Boolean);
    }, `${UsersSlice.name}/selectCurrentUserFriendIdsAndNames`)
);

export const selectCurrentUserOnlineFriendIdsAndNames = (
    createSelector((query) => {
        const friends = query(selectCurrentUserFriendIdsAndNames);

        return friends.map(({ id, name }) => {
            const isOnline = query(selectIsNotOfflineById(id));
            if (!isOnline) return;

            return {
                id,
                name,
            };
        }).filter(Boolean);
    }, `${UsersSlice.name}/selectCurrentUserOnlineFriendIdsAndNames`)
);

export const selectCurrentUserBlockedIdsAndNames = (
    createSelector((query) => {
        const blockedIds = query(selectCurrentUserBlockedIds);
        const users = query(selectEntities);

        return blockedIds.map((blockedId) => {
            const name = users[blockedId]?.name;
            if (!name) return;

            return {
                id: blockedId,
                name,
            };
        }).filter(Boolean);
    }, `${UsersSlice.name}/selectCurrentUserBlockedIdsAndNames`)
);

export const selectCurrentUserPendingUserIdsAndNames = (
    createSelector((query) => {
        const users = query(selectEntities);
        const incomingIds = query(selectCurrentUserIncomingRequestUserIds);
        const outgoingIds = query(selectCurrentUserOutgoingRequestUserIds);

        const ids = [...incomingIds, ...outgoingIds];

        return ids.map((userId) => {
            const name = users[userId]?.name;
            if (!name) return;

            return {
                id: userId,
                name,
            };
        }).filter(Boolean);
    }, `${UsersSlice.name}/selectCurrentUserPendingUserIdsAndNames`)
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