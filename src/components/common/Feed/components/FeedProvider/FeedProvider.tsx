import { FC } from 'react';
import { Types } from '../../types';
import { FeedContext } from '../../context';
import { useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { Store } from '@/features';
import { useAutoScroll, useDeriveFeedState, useInfiniteLoader } from './hooks';



export const FeedProvider: FC<Types.FeedProvider.Props> = ({
    textChatId,
    children,
}) => {
    const feedRef: Types.Context['feedRef'] = useRefManager(null);

    const autoscrollTriggerRef: (
        Types.Context['autoscrollTriggerRef']
    ) = useRefManager(null);

    const scrollableRef: (
        Types.Context['scrollableRef']
    ) = useRefManager(null);

    const scrollableWrapperRef: (
        Types.Context['scrollableWrapperRef']
    ) = useRefManager(null);

    const virtualRenderApiRef: (
        Types.Context['virtualRenderApiRef']
    ) = useRefManager(null);

    const messageIds = Store.useSelector(
        Store.TextChats.Selectors.selectDefinedMessageIdsById(textChatId),
    ) ?? [];

    const {
        isLoading,
        isUninitialized,
        onIndexesChange: onIndexesChangeLoader,
    } = useInfiniteLoader({ textChatId });

    const {
        indexesShift,
        onIndexesChange: onIndexesChangeScroll,
    } = useAutoScroll({
        autoscrollTriggerRef,
        scrollableWrapperRef,
        textChatId,
        virtualRenderApiRef,
    });

    const onIndexesChange: (
        Types.Context['onIndexesChange']
    ) = useFunction((indexes) => {
        onIndexesChangeLoader(indexes);
        onIndexesChangeScroll(indexes);
    });

    const {
        shouldShowPlaceholder,
        shouldShowMessageList,
        shouldShowMessagePlaceholder,
        shouldShowIntroduction,
        shouldShowEmptyIntroduction,
    } = useDeriveFeedState({
        isLoading,
        isUninitialized,
        textChatId,
    });

    const value: Types.Context = {
        textChatId,
        messageIds,
        indexesShift,
        onIndexesChange,
        feedRef,
        virtualRenderApiRef,
        scrollableRef,
        scrollableWrapperRef,
        autoscrollTriggerRef,
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