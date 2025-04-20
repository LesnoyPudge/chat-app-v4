import { FC } from 'react';
import { Types } from '../../types';
import { FeedContext } from '../../context';
import { useRefManager } from '@lesnoypudge/utils-react';
import { Store } from '@/features';
import { useFeedAutoScroll, useFeedScrollLoader } from './hooks';



export const FeedProvider: FC<Types.FeedProvider.Props> = ({
    textChatId,
    children,
}) => {
    const feedRef: Types.Context['feedRef'] = useRefManager(null);

    const autoscrollTriggerRef: (
        Types.Context['autoscrollTriggerRef']
    ) = useRefManager(null);

    const messagesPlaceholderRef: (
        Types.Context['messagesPlaceholderRef']
    ) = useRefManager(null);

    const virtualRenderApiRef: (
        Types.Context['virtualRenderApiRef']
    ) = useRefManager(null);

    const scrollableApiRef: (
        Types.Context['scrollableApiRef']
    ) = useRefManager(null);

    const scrollableRef: (
        Types.Context['scrollableRef']
    ) = useRefManager(null);

    const scrollableWrapperRef: (
        Types.Context['scrollableWrapperRef']
    ) = useRefManager(null);

    const definedMessageIds = Store.useSelector(
        Store.TextChats.Selectors.selectDefinedMessageIdsById(textChatId),
    );

    const {
        shouldShowPlaceholder,
        shouldShowMessageList,
        shouldShowMessagePlaceholder,
        shouldShowIntroduction,
        shouldShowEmptyIntroduction,
    } = useFeedScrollLoader({
        textChatId,
        messagesPlaceholderRef,
    });

    useFeedAutoScroll({
        autoscrollTriggerRef,
        virtualRenderApiRef,
        textChatId,
        scrollableApiRef,
        scrollableRef,
        scrollableWrapperRef,
    });

    const value: Types.Context = {
        textChatId,
        messageIds: definedMessageIds ?? [],
        feedRef,
        scrollableRef,
        scrollableWrapperRef,
        scrollableApiRef,
        autoscrollTriggerRef,
        messagesPlaceholderRef,
        virtualRenderApiRef,
        shouldShowPlaceholder,
        shouldShowMessageList,
        shouldShowMessagePlaceholder,
        shouldShowIntroduction,
        shouldShowEmptyIntroduction,
    };

    return (
        <FeedContext.Provider value={value}>
            {children}
        </FeedContext.Provider>
    );
};