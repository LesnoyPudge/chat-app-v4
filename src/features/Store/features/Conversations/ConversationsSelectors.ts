import {
    createAdapterFieldSelectors,
    createAdapterSelectors,
    createSelector,
} from '@/store/utils';
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
    selectIsExistsById,
} = createAdapterSelectors(ConversationsSlice);

export const {
    selectMembersById,
    selectTextChatById,
} = createAdapterFieldSelectors({
    keys: ['members', 'textChat'],
    selectById,
    slice: ConversationsSlice,
});

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

        const [
            textChat,
        ] = query(TextChats.Selectors.selectFilteredByConversation(
            conversationId,
        ));

        if (!textChat) return 0;

        const count = query(
            TextChats.Selectors
                .selectUnreadMessageCountById(textChat.id),
        );

        return count;
    }, `${ConversationsSlice.name}/selectNotificationCountById`)
);

export const selectIdsSortedByUnreadNotificationCount = (
    createSelector((query) => {
        const { conversations } = query(Users.Selectors.selectCurrentUser);

        const ids = conversations.map((conversationId) => {
            const count = query(selectNotificationCountById(
                conversationId,
            ));

            if (count === 0) return;

            return [conversationId, count] as const;
        }).filter(Boolean).sort(
            sortFns.bigToSmall.select(([_, count]) => count),
        ).map((v) => v[0]);

        return ids;
    }, `${ConversationsSlice.name}/selectIdsSortedByUnreadNotificationCount`)
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

export const selectSecondConversationMemberIdById = (
    createSelector.withParams((conversationId: string) => (query) => {
        const members = query(selectMembersById(conversationId));
        if (!members) return;

        const userId = query(Users.Selectors.selectCurrentUser).id;
        const targetId = members.find((id) => id !== userId);


        return targetId;
    }, `${ConversationsSlice.name}/selectSecondConversationMemberIdById`)
);

export const selectSecondConversationMemberById = (
    createSelector.withParams((conversationId: string) => (query) => {
        const targetId = query(
            selectSecondConversationMemberIdById(conversationId),
        );

        const targetUser = query(Users.Selectors.selectById(targetId));

        return targetUser;
    }, `${ConversationsSlice.name}/selectSecondConversationMemberById`)
);