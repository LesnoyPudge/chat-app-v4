import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createEntitySubscription,
    createStoreSelectors,
} from '@/redux/utils';
import { ClientEntities } from '@/types';
import { ConversationsApi } from './ConversationsApi';
import { Users } from '../Users';
import { TextChats } from '../TextChats';
import { createSelector, isAnyOf } from '@reduxjs/toolkit';
import { sortFns } from '@lesnoypudge/utils';
import { RootState } from '@/redux/store';



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

const selectIsMutedById = createSelector(
    (state: RootState) => state,
    (state: RootState, id: string) => id,
    (state, id): boolean => {
        const { mutedConversations } = Users.StoreSelectors.selectMe()(state);
        // const mutedConversationIdSet = new Set(mutedConversations);

        // const isMuted = mutedConversationIdSet.has(id);

        const isMuted = mutedConversations.includes(id);

        return isMuted;
    },
);

const selectNotificationCountById = createSelector(
    (state: RootState) => state,
    (state: RootState, id: string) => id,
    (state: RootState, id: string) => TextChats.StoreSelectors.selectFilteredByConversation(
        id,
    )(state)[0],
    (state: RootState) => Users.StoreSelectors.selectMe()(state).lastSeenMessages,
    (
        state,
        conversationId: string,
        textChat,
        lastSeenMessages,
    ): number => {
        const isMuted = selectIsMutedById(state, conversationId);
        if (isMuted) return 0;

        // const { lastSeenMessages } = Users.StoreSelectors.selectMe()(state);

        // const [
        //     textChat,
        // ] = TextChats.StoreSelectors.selectFilteredByConversation(
        //     conversationId,
        // )(state);

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
);

const selectIdsWithUnreadNotificationCountSortedByCount = createSelector(
    createSelector(
        (state: RootState) => state,
        (state: RootState) => Users.StoreSelectors.selectMe()(state).conversations,
        (state, conversations) => conversations.map((conversationId) => {
            const count = selectNotificationCountById(state, conversationId);

            if (count === 0) return;

            return [conversationId, count] as const;
        }).filter(Boolean),
    ),
    (conversationsWithCount) => {
        const result = conversationsWithCount.sort(
            sortFns.bigToSmall.select(([_, count]) => count),
        );

        return result;
    },
);


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

    // selectIdsWithUnreadNotificationCountSortedByCount: createSelector(
    //     [
    //         (state: RootState) => Users.StoreSelectors.selectMe()(state).conversations,
    //     ],
    //     (_) => {
    //         return ['sa'];
    //     },
    // ),

    // selectIdsWithUnreadNotificationCountSortedByCount: (state) => {
    //     const { conversations } = Users.StoreSelectors.selectMe()(state);

    //     const result = conversations.map((conversationId) => {
    //         const count = StoreSelectors.selectNotificationCountById(
    //             conversationId,
    //         )(state);

    //         if (count === 0) return;

    //         return [conversationId, count] as const;
    //     }).filter(Boolean).sort(
    //         sortFns.bigToSmall.select(([_, count]) => count),
    //     );

    //     console.log(result);

    //     return result;
    // },

    selectIdsWithUnreadNotificationCountSortedByCount,

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