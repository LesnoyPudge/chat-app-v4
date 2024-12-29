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
import { isAnyOf } from '@reduxjs/toolkit';



export type State = ClientEntities.Server.Base;

const name = 'Servers';

const adapter = createCustomEntityAdapter<State, typeof name>(name);

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name,
    initialState,
    reducers: (create) => ({}),
    extraReducers: (builder) => {
        builder.addMatcher(
            isAnyOf(
                ServersApi.endpoints.getOneByInvitationCode.matchFulfilled,
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