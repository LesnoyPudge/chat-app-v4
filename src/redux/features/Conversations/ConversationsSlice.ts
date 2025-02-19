import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createEntitySubscription,
    createStoreSelectors,
} from '@redux/utils';
import { ClientEntities } from '@types';
import { ConversationsApi } from './ConversationsApi';
import { Users } from '../Users';
import { TextChats } from '../TextChats';
import { isAnyOf } from '@reduxjs/toolkit';



export type State = ClientEntities.Conversation.Base;

const name = 'Conversations';

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
                ConversationsApi.endpoints.getManyDeep.matchFulfilled,
            ),
            (state, { payload }) => {
                adapter.upsertMany(state, payload.Conversation);
            },
        );
    },
    selectors: {},
}, adapter);

export const { StoreSelectors } = createStoreSelectors({
    ...adapter.storeSelectors,

    selectIsMutedById: (state, id: string): boolean => {
        const { mutedConversations } = Users.StoreSelectors.selectMe()(state);
        const mutedConversationIdSet = new Set(mutedConversations);

        const isMuted = mutedConversationIdSet.has(id);

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

    selectIdsWithUnreadNotificationCountSortedByCount: (state) => {
        const { conversations } = Users.StoreSelectors.selectMe()(state);

        return conversations.map((conversationId) => {
            const count = StoreSelectors.selectNotificationCountById(
                conversationId,
            )(state);

            if (count === 0) return;

            return [conversationId, count] as const;
        }).filter(Boolean).sort((a, b) => {
            return b[1] - a[1];
        });
    },

    selectVisibleIds: (state) => {
        const {
            conversations,
            hiddenConversations,
        } = Users.StoreSelectors.selectMe()(state);
        const hiddenConversationSet = new Set(hiddenConversations);

        const visibleIds = conversations.filter((id) => {
            return !hiddenConversationSet.has(id);
        });

        return visibleIds;
    },
});