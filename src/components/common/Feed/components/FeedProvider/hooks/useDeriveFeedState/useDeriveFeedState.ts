import { Store } from '@/features';
import { Types } from '../../../../types';



type Props = (
    Pick<Types.Context, 'textChatId'>
    & {
        isLoading: boolean;
        isUninitialized: boolean;
    }
);

export const useDeriveFeedState = ({
    textChatId,
    isLoading,
    isUninitialized,
}: Props) => {
    const firstDefinedMessageIndex = Store.useSelector(
        Store.TextChats.Selectors
            .selectFirstDefinedMessageIndexById(textChatId),
    );

    const isTextChatExists = Store.useSelector(
        Store.TextChats.Selectors.selectIsExistsById(textChatId),
    );

    const definedMessageIds = Store.useSelector(
        Store.TextChats.Selectors.selectDefinedMessageIdsById(textChatId),
    );
    const definedMessageCount = definedMessageIds?.length ?? 0;

    const isFirstFetch = isLoading || isUninitialized;

    // first render, waiting for possible messages
    const shouldShowPlaceholder = (
        !isTextChatExists
        || (
            definedMessageCount === 0
            && isFirstFetch
        )
    );

    // we have some messages in store.
    // this is only for message list
    const shouldShowMessageList = (
        definedMessageCount !== 0
    );

    // there is unloaded messages
    const shouldShowMessagePlaceholder = (
        firstDefinedMessageIndex !== 0
    );

    // there is no unloaded messages, should show intro
    const shouldShowIntroduction = (
        !shouldShowMessagePlaceholder
    );

    // there is no messages yet
    const shouldShowEmptyIntroduction = (
        shouldShowIntroduction
        && definedMessageCount === 0
    );

    return {
        shouldShowPlaceholder,
        shouldShowMessageList,
        shouldShowMessagePlaceholder,
        shouldShowIntroduction,
        shouldShowEmptyIntroduction,
    };
};