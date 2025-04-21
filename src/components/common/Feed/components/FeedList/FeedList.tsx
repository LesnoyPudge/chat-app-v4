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
    } = useFeedContextProxy();

    const renderItem = useFunction((id: string, index: number) => (
        <FeedItem
            previousMessageId={messageIds[index - 1]}
            messageId={id}
        />
    ));

    return (
        <Message.RedactorProvider>
            <VirtualList.Node
                items={messageIds}
                apiRef={virtualRenderApiRef}
                getId={(v) => v}
                itemMargin={0}
                itemSize={100}
                wrapperRef={feedRef}
                initialIndex={messageIds.length - 1}
                initialPrerender={20}
                initialAlignToTop={false}
                initialFocusedId={messageIds.at(-1)}
                overscan={5}
                initialOffset={1_000}
                viewportRef={scrollableRef}
            >
                {renderItem}
            </VirtualList.Node>
        </Message.RedactorProvider>
    );
};