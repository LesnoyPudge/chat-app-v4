import { Store } from '@/features';
import { Types } from '../../../../types';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { mutate, useFunction, useIntersectionObserver, useResizeObserver } from '@lesnoypudge/utils-react';



type Options = Pick<
    Types.Context,
    'autoscrollTriggerRef'
    | 'virtualRenderApiRef'
    | 'textChatId'
    | 'scrollableApiRef'
    | 'scrollableRef'
    | 'scrollableWrapperRef'
>;

export const useFeedAutoScroll = ({
    autoscrollTriggerRef,
    virtualRenderApiRef,
    textChatId,
    scrollableApiRef,
    scrollableRef,
    scrollableWrapperRef,
}: Options) => {
    // const isIntersectingRef = useRef(true);

    // useIntersectionObserver(autoscrollTriggerRef, (entry) => {
    //     isIntersectingRef.current = entry.isIntersecting;
    // });

    // const lastDefinedMessageIndex = Store.useSelector(
    //     Store.TextChats.Selectors
    //         .selectLastDefinedMessageIndexById(textChatId),
    // );

    // useEffect(() => {
    //     if (!lastDefinedMessageIndex) return;
    //     if (!isIntersectingRef.current) return;
    //     // if (!virtualRenderApiRef.current) return;

    //     return virtualRenderApiRef.effect((api) => {
    //         if (!api) return;

    //         console.log('scroll???', lastDefinedMessageIndex);

    //         api.scrollToIndex({
    //             index: lastDefinedMessageIndex,
    //             alignToTop: false,
    //             // move scroll to bottom
    //             // offset: 1_000,
    //         });
    //     });
    // }, [
    //     lastDefinedMessageIndex,
    //     virtualRenderApiRef,
    // ]);



    const isAutoScrollEnabledRef = useRef(true);

    useIntersectionObserver(autoscrollTriggerRef, (entry) => {
        isAutoScrollEnabledRef.current = entry.isIntersecting;
    });

    // const [indexesShift, setIndexesShift] = useState(messagesLengthRef.current || 0);
    // const earliestMessageTimestampRef = useRef(messages[0].createdAt);

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

    // useIntersectionObserver(autoScrollTriggerElement, ({ isIntersecting }) => {
    //     isAutoScrollEnabledRef.current = isIntersecting;
    // });

    // useLayoutEffect(() => {
    //     if (!isAutoScrollEnabledRef.current) return;

    //     setIndexesShift(messagesLengthRef.current || 0);
    // }, [messages, messagesLengthRef]);

    // useResizeObserver(scrollableRef, scrollToBottomIfAllowed);

    // useResizeObserver(scrollableWrapperRef, scrollToBottomIfAllowed);

    // useLayoutEffect(() => {
    //     if (!placeholderElement) return;
    //     if (!viewportList) return;
    //     if (!contentWrapperElement) return;

    //     const previousTimestamp = earliestMessageTimestampRef.current;
    //     const currentTimestamp = messages[0].createdAt;
    //     if (currentTimestamp >= previousTimestamp) return;

    //     const currentScrollPosition = contentWrapperElement.scrollTop;
    //     const messageIndex = messages.findIndex((message) => message.createdAt === previousTimestamp);
    //     const offset = placeholderElement.offsetHeight - currentScrollPosition;
    //     const shouldAlignToBottom = offset > contentWrapperElement.offsetHeight;

    //     viewportList.scrollToIndex({
    //         index: messageIndex,
    //         prerender: 20,
    //         offset: shouldAlignToBottom ? 0 : -(offset),
    //         alignToTop: shouldAlignToBottom ? false : true,
    //     });

    //     earliestMessageTimestampRef.current = currentTimestamp;
    // }, [contentWrapperElement, messages, placeholderElement, viewportList]);
};