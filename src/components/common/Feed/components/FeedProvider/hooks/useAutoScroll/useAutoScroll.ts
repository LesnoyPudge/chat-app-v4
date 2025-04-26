import { useFunction, useIntersectionObserver, useResizeObserver } from '@lesnoypudge/utils-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Store } from '@/features';
import { invariant } from '@lesnoypudge/utils';
import { Types } from '../../../../types';



type Props = Pick<
    Types.Context,
    'textChatId'
    | 'autoscrollTriggerRef'
    | 'scrollableWrapperRef'
    | 'virtualRenderApiRef'
>;

export const useAutoScroll = ({
    autoscrollTriggerRef,
    scrollableWrapperRef,
    virtualRenderApiRef,
    textChatId,
}: Props) => {
    const isAutoScrollEnabled = useRef(true);

    // useIntersectionObserver(autoscrollTriggerRef, ({ isIntersecting }) => {
    //     isAutoScrollEnabled.current = isIntersecting;
    //     console.log('isIntersecting', isIntersecting);
    // }, { rootMargin: '4px' });

    const [indexesShift, setShift] = useState<number>();

    const prevLastIndex = useRef<number>();
    const prevFirstIndex = useRef<number>();
    const isCollapsed = useRef(false);

    const lastMessageIndex = Store.useSelector(
        Store.TextChats.Selectors
            .selectLastDefinedMessageIndexById(textChatId),
    );

    const firstMessageIndex = Store.useSelector(
        Store.TextChats.Selectors
            .selectFirstDefinedMessageIndexById(textChatId),
    );

    const messageIds = Store.useSelector(
        Store.TextChats.Selectors.selectDefinedMessageIdsById(textChatId),
    );

    // update refs on rerender
    useEffect(() => {
        prevLastIndex.current = lastMessageIndex;
        prevFirstIndex.current = firstMessageIndex;
    }, [firstMessageIndex, lastMessageIndex]);

    // shift to bottom
    useLayoutEffect(() => {
        if (!isAutoScrollEnabled.current) return;
        if (lastMessageIndex === undefined) return;
        if (prevLastIndex.current === undefined) return;
        if (!messageIds) return;

        const diff = lastMessageIndex - prevLastIndex.current;
        invariant(diff >= 0);

        setShift((prev) => (prev ?? 0) + diff);

        virtualRenderApiRef.current?.scrollToIndex({
            index: messageIds.length,
            // delay: 0,
            // alignToTop: true,
            // offset: 9_999,
        });

        // autoscrollTriggerRef.current?.scrollIntoView();
    }, [
        lastMessageIndex,
        autoscrollTriggerRef,
        virtualRenderApiRef,
        messageIds,
    ]);

    // shift in place
    useLayoutEffect(() => {
        if (isAutoScrollEnabled.current) return;
        if (firstMessageIndex === undefined) return;
        if (prevFirstIndex.current === undefined) return;

        const diff = prevFirstIndex.current - firstMessageIndex;
        invariant(diff >= 0);

        setShift((prev) => (prev ?? 0) + diff);

        if (isCollapsed.current) {
            virtualRenderApiRef.current?.scrollToIndex({
                index: diff,
                alignToTop: true,
            });
        }
    }, [firstMessageIndex, virtualRenderApiRef]);

    // useResizeObserver(scrollableWrapperRef, () => {
    //     console.log('resize');
    //     if (!isAutoScrollEnabled.current) return;
    //     if (!autoscrollTriggerRef.current) return;
    //     if (!messageIds) return;

    //     console.log('resize wrapper');
    //     // autoscrollTriggerRef.current.scrollIntoView();
    //     virtualRenderApiRef.current?.scrollToIndex({
    //         index: messageIds.length - 1,
    //     });
    // });

    const onIndexesChange: (
        Types.Context['onIndexesChange']
    ) = useFunction(([start, end]) => {
        if (!messageIds) return;
        const isAtBottom = end === messageIds.length - 1;

        if (isAutoScrollEnabled.current !== isAtBottom) {
            console.log(`isAtBottom: ${isAtBottom}`);
        }

        isAutoScrollEnabled.current = isAtBottom;
        isCollapsed.current = start === end;
        console.log([start, end]);
    });

    return {
        indexesShift,
        onIndexesChange,
    };
};