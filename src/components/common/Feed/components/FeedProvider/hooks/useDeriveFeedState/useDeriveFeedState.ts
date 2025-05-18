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

    // there is unloaded messages
    const shouldShowMessagePlaceholder = (
        !!definedMessageCount
        && firstDefinedMessageIndex !== 0
    );

    // all old messages are loaded, should show intro
    const shouldShowIntroduction = (
        !shouldShowMessagePlaceholder
    );

    // text chat does not have messages
    const shouldShowEmptyIntroduction = (
        shouldShowIntroduction
        && definedMessageCount === 0
    );

    return {
        shouldShowPlaceholder,
        shouldShowMessagePlaceholder,
        shouldShowIntroduction,
        shouldShowEmptyIntroduction,
    };
};