import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createStoreSelectors,
} from '@redux/utils';
import { ClientEntities } from '@types';
import { ServersApi } from './ServersApi';
import { TextChats } from '../TextChats';
import { Users } from '../Users';
import { isAnyOf } from '@reduxjs/toolkit';



export type State = ClientEntities.Server.Base;

const name = 'Servers';

const adapter = createCustomEntityAdapter<State>()(name, []);

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name,
    initialState,
    reducers: (create) => ({}),
    extraReducers: (builder) => {
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

        const isMuted = mutedServers.includes(id);

        return isMuted;
    },

    selectIdsWithUnreadNotificationCount: (state) => {
        const { servers } = Users.StoreSelectors.selectMe()(state);

        return servers.map((serverId) => {
            const count = StoreSelectors.selectNotificationCountById(
                serverId,
            )(state);

            if (count === 0) return;

            return [serverId, count] as const;
        }).filter(Boolean);
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
});