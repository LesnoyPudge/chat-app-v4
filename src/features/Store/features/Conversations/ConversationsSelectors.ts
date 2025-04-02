import { createAdapterSelectors, createSelector } from '@/store/utils';
import { ConversationsSlice } from './ConversationsSlice';
import { Users } from '../Users';
import { TextChats } from '../TextChats';
import { sortFns } from '@lesnoypudge/utils';



export const {
    selectAll,
    selectById,
    selectByIds,
    selectEntities,
    selectIds,
    selectTotal,
    selectUndefinedIdsByIds,
} = createAdapterSelectors(ConversationsSlice);

export const selectIsMutedById = createSelector.withParams((id: string) => {
    return (query) => {
        const { mutedConversations } = query(Users.Selectors.selectCurrentUser);

        const isMuted = mutedConversations.includes(id);

        return isMuted;
    };
}, `${ConversationsSlice.name}/selectIsMutedById`);

export const selectNotificationCountById = (
    createSelector.withParams((conversationId: string) => (query) => {
        const isMuted = query(selectIsMutedById(conversationId));
        if (isMuted) return 0;

        const { lastSeenMessages } = query(Users.Selectors.selectCurrentUser);

        const [
            textChat,
        ] = query(TextChats.Selectors.selectFilteredByConversation(
            conversationId,
        ));

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
    }, `${ConversationsSlice.name}/selectNotificationCountById`)
);

export const selectIdsWithUnreadNotificationCountSortedByCount = (
    createSelector((query) => {
        const { conversations } = query(Users.Selectors.selectCurrentUser);

        const result = conversations.map((conversationId) => {
            const count = query(selectNotificationCountById(
                conversationId,
            ));

            if (count === 0) return;

            return [conversationId, count] as const;
        }).filter(Boolean).sort(
            sortFns.bigToSmall.select(([_, count]) => count),
        );

        return result;
    }, `${ConversationsSlice.name}/selectIdsWithUnreadNotificationCountSortedByCount`)
);

export const selectVisibleIds = createSelector((query) => {
    const {
        conversations,
        hiddenConversations,
    } = query(Users.Selectors.selectCurrentUser);
    const hiddenConversationSet = new Set(hiddenConversations);

    const visibleIds = conversations.filter((id) => {
        return !hiddenConversationSet.has(id);
    });

    return visibleIds;
}, `${ConversationsSlice.name}/selectVisibleIds`);

export const selectConversationByTargetId = (
    createSelector.withParams((targetId: string) => (query) => {
        const {
            conversations: conversationIds,
        } = query(Users.Selectors.selectCurrentUser);

        const conversations = query(selectByIds(...conversationIds));

        return conversations.find((value) => value.members.includes(targetId));
    }, `${ConversationsSlice.name}/selectConversationByTargetId`)
);