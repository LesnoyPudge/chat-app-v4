import { FC, memo, useLayoutEffect, useMemo, useRef } from 'react';
import { invariant } from '@lesnoypudge/utils';
import { useFeedContextProxy } from '../../context';
import { FeedItem } from '../FeedItem';
import { Store } from '@/features';
import {
    useFunction,
    usePrevious,
    withDisplayName,
} from '@lesnoypudge/utils-react';
import { Message, VirtualList } from '@/components';
import { decorate } from '@lesnoypudge/macro';



const LOAD_MORE_THRESHOLD = 3;
const SCROLL_AT_BOTTOM_THRESHOLD = 4;
const OVERSCAN = 3;
const ITEM_SIZE_ESTIMATE = 40;
const SCROLL_TO_BOTTOM_EXTRA_OFFSET = 9_999;
const PRERENDER = Math.floor(
    document.documentElement.clientHeight
    / ITEM_SIZE_ESTIMATE,
);

const useExternalData = () => {
    const {
        scrollableApiRef,
        textChatId,
        loadMore,
        feedRef,
        scrollableRef,
    } = useFeedContextProxy();

    const messageIds = Store.useSelector(
        Store.TextChats.Selectors.selectDefinedMessageIdsById(textChatId),
    );
    invariant(messageIds);

    const firstMessageIndex = Store.useSelector(
        Store.TextChats.Selectors
            .selectFirstDefinedMessageIndexById(textChatId),
    );

    const lastMessageIndex = Store.useSelector(
        Store.TextChats.Selectors
            .selectLastDefinedMessageIndexById(textChatId),
    );

    return {
        scrollableApiRef,
        loadMore,
        firstMessageIndex,
        lastMessageIndex,
        messageIds,
        scrollableRef,
        feedRef,
    };
};

decorate(withDisplayName, 'FeedList', decorate.target);
decorate(memo, decorate.target);

export const FeedList: FC = () => {
    const {
        firstMessageIndex,
        lastMessageIndex,
        loadMore,
        scrollableApiRef,
        messageIds,
        scrollableRef,
        feedRef,
    } = useExternalData();

    const count = messageIds.length;
    const virtualizerRef = useRef<
        VirtualList.Types.VirtualRenderTypes.Api
    >(null);
    const isAtBottomRef = useRef(true);
    const prevFirstMessageIndex = usePrevious(firstMessageIndex);
    const prevLastMessageIndex = usePrevious(lastMessageIndex);
    const prevCount = usePrevious(count);
    const savedScrollPositionRef = useRef({
        offset: 0,
        index: 0,
    });

    // prepend
    useLayoutEffect(() => {
        if (prevCount === undefined) return;
        if (prevFirstMessageIndex === undefined) return;
        if (firstMessageIndex === prevFirstMessageIndex) return;

        const virtualizer = virtualizerRef.current;
        if (!virtualizer) return;

        const countDiff = count - prevCount;
        invariant(countDiff > 0);

        const savedPos = savedScrollPositionRef.current;
        const previousIndex = countDiff + savedPos.index;

        virtualizer.scrollToIndex({
            index: previousIndex,
            alignToTop: true,
            offset: savedPos.offset,
            prerender: PRERENDER,
        });
    }, [
        prevFirstMessageIndex,
        firstMessageIndex,
        prevCount,
        count,
    ]);

    // append
    useLayoutEffect(() => {
        if (prevLastMessageIndex === undefined) return;
        if (prevLastMessageIndex === lastMessageIndex) return;
        if (!isAtBottomRef.current) return;

        const virtualizer = virtualizerRef.current;
        if (!virtualizer) return;

        virtualizer.scrollToIndex({
            index: count - 1,
            prerender: PRERENDER,
            alignToTop: true,
            offset: SCROLL_TO_BOTTOM_EXTRA_OFFSET,
        });
    }, [count, lastMessageIndex, prevLastMessageIndex]);

    // track scroll position
    useLayoutEffect(() => {
        return scrollableApiRef.effect((scrollableApi) => {
            const virtualizer = virtualizerRef.current;

            if (!virtualizer) return;
            if (!scrollableApi) return;

            return scrollableApi.on('scroll', () => {
                const pos = virtualizer.getScrollPosition();

                savedScrollPositionRef.current = pos;
            });
        });
    }, [scrollableApiRef]);

    // check scroll position before new items are appended.
    useMemo(() => {
        if (lastMessageIndex === prevLastMessageIndex) return;

        const scrollableApi = scrollableApiRef.current;
        if (!scrollableApi) return;

        const scrollable = scrollableApi.elements().viewport;
        const diff = (
            scrollable.scrollHeight
            - scrollable.clientHeight
            - scrollable.scrollTop
        );

        isAtBottomRef.current = diff <= SCROLL_AT_BOTTOM_THRESHOLD;
    }, [lastMessageIndex, prevLastMessageIndex, scrollableApiRef]);

    // load more when first index reach threshold.
    const onViewportIndexesChange = useFunction((
        [start]: [number, number],
    ) => {
        if (!firstMessageIndex) return;

        const scrollable = scrollableRef.current;
        if (!scrollable) return;

        const isAtTop = start <= LOAD_MORE_THRESHOLD;
        if (!isAtTop) return;

        void loadMore({
            from: firstMessageIndex,
        });
    });

    const renderItem = useFunction((id: string, index: number) => {
        const prevId = messageIds[index - 1];

        return (
            <FeedItem
                key={id}
                messageId={id}
                previousMessageId={prevId}
            />
        );
    });

    return (
        <Message.RedactorProvider>
            <VirtualList.Node
                items={messageIds}
                getId={(v) => v}
                wrapperRef={feedRef}
                initialIndex={count - 1}
                viewportRef={scrollableRef}
                apiRef={virtualizerRef}
                overscan={OVERSCAN}
                overflowAnchor='none'
                itemSize={ITEM_SIZE_ESTIMATE}
                initialPrerender={PRERENDER}
                onViewportIndexesChange={onViewportIndexesChange}
                takeInitialIdFrom='end'
                // when items are prepended we shift to previous items.
                // after we shift, we scroll to shifted items.
                // this allows to keep rendered items in place.
                indexesShift={count}
            >
                {renderItem}
            </VirtualList.Node>
        </Message.RedactorProvider>
    );
};