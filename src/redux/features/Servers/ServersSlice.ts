import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createEntitySubscription,
    createStoreSelectors,
} from '@/redux/utils';
import { ClientEntities } from '@/types';
import { ServersApi } from './ServersApi';
import { TextChats } from '../TextChats';
import { Users } from '../Users';
import { isAnyOf } from '@reduxjs/toolkit';
import { Roles } from '../Roles';
import { sortFns } from '@lesnoypudge/utils';
import { recalculatePermissions } from '@/fakeShared';



export type State = ClientEntities.Server.Base;

const name = 'Servers';

const adapter = createCustomEntityAdapter<State>()(name, []);

export const {
    Subscription,
    createExtraReducers,
} = createEntitySubscription(name, adapter);

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name,
    initialState,
    reducers: (create) => ({}),
    extraReducers: (builder) => {
        createExtraReducers(builder);

        builder.addMatcher(
            isAnyOf(
                Users.Api.endpoints.login.matchFulfilled,
                Users.Api.endpoints.registration.matchFulfilled,
                Users.Api.endpoints.refresh.matchFulfilled,
                ServersApi.endpoints.getManyDeep.matchFulfilled,
            ),
            (state, { payload }) => {
                adapter.upsertMany(state, payload.Server);
            },
        );

        builder.addMatcher(
            isAnyOf(
                ServersApi.endpoints.getByInvitationCode.matchFulfilled,
                ServersApi.endpoints.create.matchFulfilled,
                ServersApi.endpoints.acceptInvitation.matchFulfilled,
            ),
            adapter.extraReducers.upsertOne,
        );
        builder.addMatcher(
            ServersApi.endpoints.leave.matchFulfilled,
            (state, { meta }) => {
                adapter.extraReducers.removeOne(
                    state,
                    { payload: meta.arg.originalArgs.serverId },
                );
            },
        );
    },
    selectors: {},
}, adapter);

export const { StoreSelectors } = createStoreSelectors({
    ...adapter.storeSelectors,

    selectNotificationCountById: (state, serverId: string): number => {
        const isMuted = StoreSelectors.selectIsMutedById(serverId)(state);
        if (isMuted) return 0;

        const { lastSeenMessages } = Users.StoreSelectors.selectMe()(state);

        const textChats = TextChats.StoreSelectors.selectFilteredByServer(
            serverId,
        )(state);

        const notificationCount = textChats.reduce<number>((acc, textChat) => {
            const lastSeenMessageIndex = lastSeenMessages.find((item) => {
                return item.textChatId === textChat.id;
            })?.lastIndex;

            if (lastSeenMessageIndex === undefined) {
                acc += textChat.messageCount;
                return acc;
            }

            const diff = textChat.messageCount - (lastSeenMessageIndex + 1);

            acc += diff;

            return acc;
        }, 0);

        return notificationCount;
    },

    selectHasNotificationsById: (state, id: string) => {
        return StoreSelectors.selectNotificationCountById(id)(state) > 0;
    },

    selectIsMutedById: (state, id: string): boolean => {
        const { mutedServers } = Users.StoreSelectors.selectMe()(state);
        const mutedServerIdSet = new Set(mutedServers);

        const isMuted = mutedServerIdSet.has(id);

        return isMuted;
    },

    selectIdsWithUnreadNotificationCountSortedByCount: (state) => {
        const { servers } = Users.StoreSelectors.selectMe()(state);

        return servers.map((serverId) => {
            const count = StoreSelectors.selectNotificationCountById(
                serverId,
            )(state);

            if (count === 0) return;

            return [serverId, count] as const;
        }).filter(Boolean).sort(
            sortFns.bigToSmall.select(([_, count]) => count),
        );
    },

    selectIdsWithoutUnreadNotifications: (state) => {
        const { servers: serverIds } = Users.StoreSelectors.selectMe()(state);

        return serverIds.filter((serverId) => {
            const count = StoreSelectors.selectNotificationCountById(
                serverId,
            )(state);

            return count === 0;
        });
    },

    selectUserPermissions: (() => {
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

        return (
            state,
            { serverId, userId }: { serverId: string; userId: string },
        ): ClientEntities.Role.Permissions => {
            const server = StoreSelectors.selectById(serverId)(state);
            if (!server) return permissionPresets.rejected;

            if (server.owner === userId) return permissionPresets.owner;

            const roles = Roles.StoreSelectors.selectByIds(server.roles)(state);
            const [highestRole] = roles.filter((role) => {
                return role.users.includes(userId);
            }).sort(sortFns.bigToSmall.select(({ weight }) => weight));

            if (!highestRole) return permissionPresets.rejected;

            return recalculatePermissions({
                originalPermissions: highestRole.permissions,
                ownerId: server.owner,
                userId,
            });
        };
    })(),

    selectMyPermissionsByServerId: (
        state,
        serverId: string,
    ): ClientEntities.Role.Permissions => {
        const { id } = Users.StoreSelectors.selectMe()(state);

        return StoreSelectors.selectUserPermissions({
            userId: id,
            serverId,
        })(state);
    },
});