import { Types } from '../../../../types';
import { useLayoutEffect, useRef } from 'react';
import { mutate, useFunction, useIntersectionObserver, useResizeObserver } from '@lesnoypudge/utils-react';



type Options = Pick<
    Types.Context,
    'autoscrollTriggerRef'
    | 'scrollableApiRef'
    | 'scrollableRef'
    | 'scrollableWrapperRef'
    | 'messageIds'
    | 'setIndexesShift'
>;

export const useFeedAutoScroll = ({
    autoscrollTriggerRef,
    scrollableApiRef,
    scrollableRef,
    scrollableWrapperRef,
    messageIds,
    setIndexesShift,
}: Options) => {
    const isAutoScrollEnabledRef = useRef(true);

    useIntersectionObserver(autoscrollTriggerRef, (entry) => {
        isAutoScrollEnabledRef.current = entry.isIntersecting;
        console.log(`isIntersecting: ${entry.isIntersecting}`);
    });

    const scrollToBottom = useFunction(() => {
        if (!scrollableRef.current) return;

        mutate(
            scrollableRef.current,
            'scrollTop',
            scrollableRef.current.scrollHeight,
        );
    });

    const scrollToBottomIfAllowed = useFunction(() => {
        if (!isAutoScrollEnabledRef.current) return;

        scrollToBottom();
    });

    useResizeObserver(scrollableWrapperRef, scrollToBottomIfAllowed);

    useLayoutEffect(() => {
        if (!isAutoScrollEnabledRef.current) return;

        setIndexesShift(messageIds.length);
    }, [messageIds, setIndexesShift]);

    useLayoutEffect(() => {
        return scrollableApiRef.effect((api) => {
            if (!api) return;

            scrollToBottom();

            return api.on('updated', () => {
                scrollToBottomIfAllowed();
            });
        });
    }, [
        scrollToBottom,
        scrollToBottomIfAllowed,
        scrollableApiRef,
        scrollableRef,
    ]);
};