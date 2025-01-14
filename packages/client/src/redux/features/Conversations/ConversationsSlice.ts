import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createStoreSelectors,
} from '@redux/utils';
import { ClientEntities } from '@types';
import { ConversationsApi } from './ConversationsApi';
import { Users } from '../Users';
import { TextChats } from '../TextChats';



export type State = ClientEntities.Conversation.Base;

const name = 'Conversations';

const adapter = createCustomEntityAdapter<State>()(name, []);

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name,
    initialState,
    reducers: (create) => ({}),
    extraReducers: (builder) => {},
    selectors: {},
}, adapter);

export const { StoreSelectors } = createStoreSelectors({
    ...adapter.storeSelectors,
    selectIsMutedById: (state, id: string): boolean => {
        const { mutedServers } = Users.StoreSelectors.selectMe()(state);

        const isMuted = mutedServers.includes(id);

        return isMuted;
    },

    selectNotificationCountById: (state, conversationId: string): number => {
        const isMuted = StoreSelectors.selectIsMutedById(conversationId)(state);
        if (isMuted) return 0;

        const { lastSeenMessages } = Users.StoreSelectors.selectMe()(state);

        const [
            textChat,
        ] = TextChats.StoreSelectors.selectFilteredByConversation(
            conversationId,
        )(state);

        if (!textChat) return 0;

        const lastSeenMessageIndex = lastSeenMessages.find((item) => {
            return item.textChatId === textChat.id;
        })?.lastIndex;

        if (lastSeenMessageIndex === undefined) {
            return textChat.messageCount;
        }

        const diff = Math.max(
            0,
            textChat.messageCount - (lastSeenMessageIndex + 1),
        );

        return diff;
    },

    selectIdsWithUnreadNotificationCount: (state) => {
        const { conversations } = Users.StoreSelectors.selectMe()(state);

        return conversations.map((conversationId) => {
            const count = StoreSelectors.selectNotificationCountById(
                conversationId,
            )(state);

            if (count === 0) return;

            return [conversationId, count] as const;
        }).filter(Boolean);
    },
});