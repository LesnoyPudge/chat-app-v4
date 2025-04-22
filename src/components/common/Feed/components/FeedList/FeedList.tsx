import { FC } from 'react';
import { Message, VirtualList } from '@/components';
import { useFeedContextProxy, useFeedContextSelector } from '../../context';
import { FeedItem } from '../FeedItem';
import { useFunction } from '@lesnoypudge/utils-react';



export const FeedList: FC = () => {
    const messageIds = useFeedContextSelector((v) => v.messageIds);
    const {
        feedRef,
        virtualRenderApiRef,
        scrollableRef,
        shouldShowMessageList,
        indexesShift,
    } = useFeedContextProxy();

    const renderItem = useFunction((id: string, index: number) => (
        <FeedItem
            previousMessageId={messageIds[index - 1]}
            messageId={id}
        />
    ));

    if (!shouldShowMessageList) return null;

    return (
        <Message.RedactorProvider>
            <VirtualList.Node
                items={messageIds}
                apiRef={virtualRenderApiRef}
                getId={(v) => v}
                itemMargin={0}
                itemSize={200}
                wrapperRef={feedRef}
                indexesShift={indexesShift}
                initialIndex={messageIds.length - 1}
                initialPrerender={20}
                takeInitialIdFrom='end'
                overscan={3}
                viewportRef={scrollableRef}
            >
                {renderItem}
            </VirtualList.Node>
        </Message.RedactorProvider>
    );
};