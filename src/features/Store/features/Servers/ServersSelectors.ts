import {
    createAdapterFieldSelectors,
    createAdapterSelectors,
    createSelector,
} from '@/store/utils';
import { ServersSlice } from './ServersSlice';
import { Users } from '../Users';
import { TextChats } from '../TextChats';
import { sortFns } from '@lesnoypudge/utils';
import { Roles } from '../Roles';
import { ClientEntities } from '@/types';
import { recalculatePermissions } from '@/fakeShared';



export const {
    selectAll,
    selectById,
    selectByIds,
    selectEntities,
    selectIds,
    selectTotal,
    selectUndefinedIdsByIds,
    selectIsExistsById,
} = createAdapterSelectors(ServersSlice);

export const {
    selectMembersById,
    selectNameById,
    selectChannelsById,
    selectInvitationsById,
    selectOwnerById,
    selectAvatarById,
} = createAdapterFieldSelectors({
    keys: [
        'members',
        'name',
        'channels',
        'invitations',
        'owner',
        'avatar',
    ],
    selectById,
    slice: ServersSlice,
});


export const selectIsMutedById = createSelector.withParams((id: string) => {
    return (query) => {
        const { mutedServers } = query(Users.Selectors.selectCurrentUser);

        const isMuted = mutedServers.includes(id);

        return isMuted;
    };
}, `${ServersSlice.name}/selectIsMutedById`);

export const selectNotificationCountById = createSelector.withParams((
    serverId: string,
) => {
    return (query) => {
        const isMuted = query(selectIsMutedById(serverId));
        if (isMuted) return 0;

        const textChats = query(TextChats.Selectors.selectFilteredByServer(
            serverId,
        ));

        const notificationCount = textChats.reduce<number>((acc, textChat) => {
            const count = query(
                TextChats.Selectors
                    .selectUnreadMessageCountById(textChat.id),
            );

            acc += count;

            return acc;
        }, 0);

        return notificationCount;
    };
}, `${ServersSlice.name}/selectNotificationCountById`);

export const selectHasNotificationsById = createSelector.withParams((
    id: string,
) => {
    return (query) => {
        return query(selectNotificationCountById(id)) > 0;
    };
}, `${ServersSlice.name}/selectHasNotificationsById`);

// export const selectIdsWithUnreadNotificationCount = (
//     createSelector((query) => {
//         const { servers } = query(Users.Selectors.selectCurrentUser);

//         return servers.map((serverId) => {
//             const count = query(selectNotificationCountById(serverId));
//             if (count === 0) return;

//             return [serverId, count] as const;
//         }).filter(Boolean);
//     }, `${ServersSlice.name}/selectIdsWithUnreadNotificationCount`)
// );

// export const selectIdsSortedByUnreadNotificationCount = (
//     createSelector((query) => {
//         const servers = query(selectIdsWithUnreadNotificationCount);

//         return servers.sort(
//             sortFns.bigToSmall.select(([_, count]) => count),
//         ).map((v) => v[0]);
//     }, `${ServersSlice.name}/selectIdsSortedByUnreadNotificationCount`)
// );

// export const selectIdsWithoutUnreadNotifications = (
//     createSelector((query) => {
//         const { servers: serverIds } = query(Users.Selectors.selectCurrentUser);

//         return serverIds.filter((serverId) => {
//             const count = query(selectNotificationCountById(
//                 serverId,
//             ));

//             return count === 0;
//         });
//     }, `${ServersSlice.name}/selectIdsWithoutUnreadNotifications`)
// );

export const selectUserPermissions = (() => {
    const permissionPresets = {
        rejected: {
            admin: false,
            banMember: false,
            channelControl: false,
            createInvitation: false,
            kickMember: false,
            serverControl: false,
        },
        owner: {
            admin: true,
            banMember: true,
            channelControl: true,
            createInvitation: true,
            kickMember: true,
            serverControl: true,
        },
    } satisfies Record<string, ClientEntities.Role.Permissions>;

    return createSelector.withParams((
        serverId: string,
        userId: string,
    ) => (query) => {
        const server = query(selectById(serverId));
        if (!server) return permissionPresets.rejected;

        if (server.owner === userId) return permissionPresets.owner;

        const roles = query(Roles.Selectors.selectByIds(...server.roles));

        const [highestRole] = roles.filter((role) => {
            return role.users.includes(userId);
        }).sort(sortFns.bigToSmall.select(({ weight }) => weight));

        if (!highestRole) return permissionPresets.rejected;

        return recalculatePermissions({
            originalPermissions: highestRole.permissions,
            ownerId: server.owner,
            userId,
        });
    }, `${ServersSlice.name}/selectUserPermissions`);
})();

export const selectMyPermissionsByServerId = (
    createSelector.withParams((serverId: string) => (query) => {
        const userId = query(Users.Selectors.selectCurrentUser).id;

        return query(selectUserPermissions(serverId, userId));
    }, `${ServersSlice.name}/selectMyPermissionsByServerId`)
);

export const selectOnlineMemberIdsById = (
    createSelector.withParams((serverId: string) => (query) => {
        const membersIds = query(selectMembersById(serverId));
        if (!membersIds?.length) return [];

        return membersIds.filter((memberId) => {
            return query(Users.Selectors.selectIsNotOfflineById(memberId));
        });
    }, `${ServersSlice.name}/selectOnlineMemberIdsById`)
);

export const selectOfflineMemberIdsById = (
    createSelector.withParams((serverId: string) => (query) => {
        const membersIds = query(selectMembersById(serverId));
        if (!membersIds?.length) return [];

        return membersIds.filter((memberId) => {
            return query(Users.Selectors.selectIsOfflineById(memberId));
        });
    }, `${ServersSlice.name}/selectOfflineMemberIdsById`)
);

export const selectBannedUsersById = (
    createSelector.withParams((serverId: string) => (query) => {
        const users = query(Users.Selectors.selectEntities);
        const server = query(selectById(serverId));
        if (!server) return [];

        return server.banned.map((bannedId) => {
            return users[bannedId];
        }).filter(Boolean);
    }, `${ServersSlice.name}/selectBannedUsersById`)
);

export const selectMemberUsersById = (
    createSelector.withParams((serverId: string) => (query) => {
        const users = query(Users.Selectors.selectEntities);
        const server = query(selectById(serverId));
        if (!server) return [];

        const members = server.members.map((memberId) => {
            return users[memberId];
        }).filter(Boolean);

        return members;
    }, `${ServersSlice.name}/selectMemberUsersById`)
);