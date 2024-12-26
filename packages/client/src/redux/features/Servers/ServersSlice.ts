import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createStoreSelectors,
} from '@redux/utils';
import { ClientEntities } from '@types';
import { ServersApi } from './ServersApi';
import { TextChats } from '../TextChats';
import { Users } from '../Users';
import { Channels } from '../Channels';



export type State = ClientEntities.Server.Base;

const adapter = createCustomEntityAdapter<State>();

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name: 'Servers',
    initialState,
    reducers: (create) => ({}),
    extraReducers: (builder) => {
        builder.addMatcher(
            ServersApi.endpoints.getOneByInvitationCode.matchFulfilled,
            adapter.extraReducers.upsertOne,
        );
        builder.addMatcher(
            ServersApi.endpoints.create.matchFulfilled,
            adapter.extraReducers.upsertOne,
        );
        builder.addMatcher(
            ServersApi.endpoints.acceptInvitation.matchFulfilled,
            adapter.extraReducers.upsertOne,
        );
    },
    selectors: {},
}, adapter);

export const { StoreSelectors } = createStoreSelectors({
    // selectByTextChatId: (state, id: string) => {
    //     const textChat = TextChats.Slice.selectors.selectById(id)(
    //         state.TextChatsSlice,
    //     );
    //     if (!textChat?.channel) return;

    //     const channel = Channels.Slice.selectors.selectById(
    //         textChat.channel,
    //     )(state.ChannelsSlice);
    //     if (!channel) return;

    //     return Slice.selectors.selectById(
    //         channel.server,
    //     )(state.ServersSlice);
    // },

    // selectWithNotificationIds: (state): string[] => {
    //     const {
    //         mutedServers,
    //         lastSeenMessages,
    //     } = Users.StoreSelectors.selectMe()(state);

    //     const unmutedLastSeenMessages = lastSeenMessages.filter((item) => {
    //         return !mutedTextChats.includes(item.textChatId);
    //     });

    //     const textChatIds = unmutedLastSeenMessages.map((item) => {
    //         return item.textChatId;
    //     });

    //     const textChats = TextChats.Slice.selectors.selectByIds(textChatIds)(
    //         state.TextChatsSlice,
    //     );

    //     const textChatsWithNotifications = textChats.filter((textChat) => {
    //         const lastMessageIndex = textChat.messages.length - 1;
    //         const lastSeenMessage = unmutedLastSeenMessages.find((item) => {
    //             return item.textChatId === textChat.id;
    //         });
    //         if (!lastSeenMessage) return false;

    //         return lastMessageIndex > lastSeenMessage.lastIndex;
    //     });

    //     const channelWithNotificationIds = (
    //         textChatsWithNotifications.map((textChat) => {
    //             return textChat.channel;
    //         }).filter(Boolean)
    //     );

    //     const channelsWithNotifications = (
    //         Channels.Slice.selectors.selectByIds(channelWithNotificationIds)(
    //             state.ChannelsSlice,
    //         )
    //     );

    //     const serverWithNotificationIds = (
    //         channelsWithNotifications.map((channel) => {
    //             return channel.server;
    //         })
    //     );

    //     return serverWithNotificationIds;
    // },

    // selectWithoutNotificationIds: (state) => {
    //     const { servers } = Users.StoreSelectors.selectMe()(state);

    //     const serverWithNotificationIds = (
    //         StoreSelectors.selectWithNotificationIds()(state)
    //     );

    //     return servers.filter((serverId) => {
    //         return !serverWithNotificationIds.includes(serverId);
    //     });
    // },

    selectNotificationCountById: (state, serverId: string): number => {
        const isMuted = StoreSelectors.selectIsMutedById(serverId)(state);
        if (isMuted) return 0;

        const { lastSeenMessages } = Users.StoreSelectors.selectMe()(state);

        const textChats = TextChats.StoreSelectors.selectByServerId(
            serverId,
        )(state);

        const notificationCount = textChats.reduce<number>((acc, textChat) => {
            const lastSeenMessageIndex = lastSeenMessages.find((item) => {
                return item.textChatId === textChat.id;
            })?.lastIndex;
            if (!lastSeenMessageIndex) return acc;

            const lastMessageIndex = textChat.messages.length - 1;
            const diff = lastMessageIndex - lastSeenMessageIndex;

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
});