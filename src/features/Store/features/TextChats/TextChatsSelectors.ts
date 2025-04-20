import {
    createAdapterFieldSelectors,
    createAdapterFilterSelectors,
    createAdapterSelectors,
    createSelector,
} from '@/store/utils';
import { TextChatsSlice } from './TextChatsSlice';
import { Messages } from '../Messages';
import { invariant } from '@lesnoypudge/utils';



export const {
    selectAll,
    selectById,
    selectByIds,
    selectEntities,
    selectIds,
    selectTotal,
    selectUndefinedIdsByIds,
    selectIsExistsById,
} = createAdapterSelectors(TextChatsSlice);

export const {
    selectMessagesById,
} = createAdapterFieldSelectors({
    keys: ['messages'],
    selectById,
    slice: TextChatsSlice,
});

export const {
    selectFilteredByConversation,
    selectFilteredByServer,
} = createAdapterFilterSelectors({
    keys: ['server', 'conversation'],
    slice: TextChatsSlice,
    selectAll,
});

export const selectDefinedMessageIdsById = createSelector.withParams(
    (textChatId: string) => (query) => {
        const allMessagesIds = query(selectMessagesById(textChatId));
        if (!allMessagesIds?.length) return allMessagesIds;

        const messageEntities = query(Messages.Selectors.selectEntities);

        return allMessagesIds.filter((id) => id in messageEntities);
    },
    `${TextChatsSlice.name}/selectDefinedMessageIdsById`,
);

const selectFirstDefinedMessageIdById = createSelector.withParams(
    (textChatId: string) => (query) => {
        const allMessagesIds = query(selectMessagesById(textChatId));
        if (!allMessagesIds?.length) return;

        const messageEntities = query(Messages.Selectors.selectEntities);

        const firstDefinedMessageId = allMessagesIds.find((messageId) => {
            return messageId in messageEntities;
        });

        return firstDefinedMessageId;
    },
    `${TextChatsSlice.name}/selectFirstDefinedMessageIdById`,
);

export const selectFirstDefinedMessageIndexById = createSelector.withParams(
    (textChatId: string) => (query) => {
        const firstMessageId = query(
            selectFirstDefinedMessageIdById(textChatId),
        );
        if (!firstMessageId) return;

        const firstMessageIndex = query(
            Messages.Selectors.selectIndexById(firstMessageId),
        );

        return firstMessageIndex;
    },
    `${TextChatsSlice.name}/selectFirstDefinedMessageIndexById`,
);

export const selectLastDefinedMessageIndexById = createSelector.withParams(
    (textChatId: string) => (query) => {
        const definedMessageIds = query(
            selectDefinedMessageIdsById(textChatId),
        );
        if (!definedMessageIds) return;

        const lastMessageId = definedMessageIds.at(-1);
        if (!lastMessageId) return;

        const lastMessageIndex = query(
            Messages.Selectors.selectIndexById(lastMessageId),
        );
        invariant(
            lastMessageIndex !== undefined,
            'message selected from defined can not be undefined',
        );

        return lastMessageIndex;
    },
    `${TextChatsSlice.name}/selectLastDefinedMessageIndexById`,
);