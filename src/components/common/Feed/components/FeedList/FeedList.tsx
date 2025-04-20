import { FC } from 'react';
import { Message, VirtualList } from '@/components';
import { useFeedContextProxy, useFeedContextSelector } from '../../context';
import { FeedItem } from '../FeedItem';



export const FeedList: FC = () => {
    const { feedRef, virtualRenderApiRef } = useFeedContextProxy();
    const messageIds = useFeedContextSelector((v) => v.messageIds);

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
            >
                {(id) => <FeedItem messageId={id}/>}
            </VirtualList.Node>
        </Message.RedactorProvider>
    );
};