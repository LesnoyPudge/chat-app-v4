import { decorate } from '@lesnoypudge/macro';
import { useFunction, withDisplayName } from '@lesnoypudge/utils-react';
import { ComponentProps, FC, Fragment, memo, useLayoutEffect, useRef } from 'react';
import { useFeedContextProxy } from '../../context';
import { FeedItem } from '../FeedItem';
import { invariant } from '@lesnoypudge/utils';
import { FeedIntroduction } from '../FeedIntroduction';
import { Store } from '@/features';
import { Virtualizer, VirtualizerProps } from 'virtua';
import { T } from '@lesnoypudge/types-utils-base/namespace';



type CustomVirtualizerProps = (
    T.Except<VirtualizerProps, 'children'>
    & Pick<ComponentProps<typeof Virtualizer>, 'ref'>
);

const AT_BOTTOM_THRESHOLD = -1.5;
const VISIBLE_ELEMENT_INDEX_TO_LOAD_MORE = 1;

decorate(withDisplayName, 'FeedScroller', decorate.target);
decorate(memo, decorate.target);

export const FeedScroller: FC = () => {
    const isPrependingRef = useRef(false);
    const isAtBottomRef = useRef(true);
    const {
        scrollableRef,
        messagePlaceholderHeight,
        textChatId,
        virtualizerRef,
        loadMore,
    } = useFeedContextProxy();

    const firstMessageIndex = Store.useSelector(
        Store.TextChats.Selectors
            .selectFirstDefinedMessageIndexById(textChatId),
    );

    const isReachedOldestMessage = firstMessageIndex === 0;

    const messageIds = Store.useSelector(
        Store.TextChats.Selectors.selectDefinedMessageIdsById(textChatId),
    );
    invariant(messageIds);

    const listCount = messageIds.length;

    useLayoutEffect(() => {
        isPrependingRef.current = false;
    });

    useLayoutEffect(() => {
        const virtualizer = virtualizerRef.current;
        if (!virtualizer) return;
        if (!isAtBottomRef.current) return;

        const lastItemIndex = listCount - 1;

        virtualizer.scrollToIndex(lastItemIndex, {
            align: 'start',
        });
        // in case where last element is bigger then viewport
        // we should scroll an extra offset to be at the bottom of the list
        // virtualizer.scrollBy(virtualizer.getItemSize(lastItemIndex));
    }, [listCount, virtualizerRef]);

    const renderItem = useFunction((index: number) => {
        const prevId = messageIds[index - 1];
        const id = messageIds[index];
        invariant(id);

        const isFirst = (
            (index === 0)
            && isReachedOldestMessage
        );

        return (
            <Fragment key={id}>
                <If condition={isFirst}>
                    <FeedIntroduction/>
                </If>

                {/* <FeedItem
                    previousMessageId={prevId}
                    messageId={id}
                /> */}
            </Fragment>
        );
    });

    const handleScroll = useFunction((offset: number) => {
        const virtualizer = virtualizerRef.current;
        if (!virtualizer) return;

        const diff = (
            offset
            - virtualizer.scrollSize
            + virtualizer.viewportSize
        );
        // console.log(diff);
        isAtBottomRef.current = diff >= AT_BOTTOM_THRESHOLD;
        // console.log(isAtBottomRef.current);
        const firstIndex = virtualizer.findStartIndex();
        const isAtTop = firstIndex === VISIBLE_ELEMENT_INDEX_TO_LOAD_MORE;

        if (!isAtTop) return;
        if (!firstMessageIndex) return;

        void loadMore({
            from: firstMessageIndex,

        })?.then((v) => {
            isPrependingRef.current = true;
        });
    });

    const virtualizerProps: CustomVirtualizerProps = {
        scrollRef: scrollableRef,
        count: listCount,
        ref: virtualizerRef,
        shift: true,
        // shift: isPrependingRef.current,
        // startMargin: isReachedOldestMessage ? 0 : messagePlaceholderHeight,
        onScroll: handleScroll,
    };

    return (
        <Virtualizer {...virtualizerProps}>
            {renderItem}
        </Virtualizer>
    );
};