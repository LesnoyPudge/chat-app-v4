import { FC, memo, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Message, VirtualList } from '@/components';
import { useFeedContextProxy, useFeedContextSelector } from '../../context';
import { FeedItem } from '../FeedItem';
import { useFunction, withDisplayName } from '@lesnoypudge/utils-react';
import { decorate } from '@lesnoypudge/macro';
import { ViewportList } from 'src/components/common/VirtualRender/components/VirtualRenderList/components';
import { ListRootProps, Virtuoso, VirtuosoProps } from 'react-virtuoso';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { Store } from '@/features';
import { FeedIntroduction } from '../FeedIntroduction';
import { FeedPlaceholder } from '../FeedPlaceholder';
import { useVirtualizer } from '@tanstack/react-virtual';



decorate(withDisplayName, 'FeedList', decorate.target);
decorate(memo, decorate.target);

export const FeedList: FC = () => {
    const messageIds = useFeedContextSelector((v) => v.messageIds);
    const {
        feedRef,
        shouldShowMessageList,
        scrollableRef,
        indexesShift,
        virtualRenderApiRef,
        onIndexesChange,
        shouldShowMessagePlaceholder,
        textChatId,
    } = useFeedContextProxy();

    const renderItem = useFunction((id: string, index: number) => (
        <FeedItem
            key={id}
            previousMessageId={messageIds[index - 1]}
            messageId={id}
        />
    ));

    // useEffect(() => {
    //     console.log(indexesShift);
    // }, [indexesShift]);

    // useLayoutEffect(() => {
    //     virtualRenderApiRef.current?.scrollToIndex({
    //         index: messageIds.length - 1,
    //     });
    // }, [messageIds.length, virtualRenderApiRef]);

    const firstMessageIndex = Store.useSelector(
        Store.TextChats.Selectors
            .selectFirstDefinedMessageIndexById(textChatId),
    );

    const Header = useMemo(() => () => (
        <>
            <FeedIntroduction/>

            <If condition={shouldShowMessagePlaceholder}>
                <FeedPlaceholder/>
            </If>
        </>
    ), [shouldShowMessagePlaceholder]);

    const [
        getMessagesTrigger,
        getMessagesHelpers,
    ] = Store.Messages.Api.useLazyMessageGetManyByTextChatIdQuery();

    const loadMoreFn = useFunction(({ from }: { from: number | null }) => {
        if (getMessagesHelpers.isFetching) return;

        void getMessagesTrigger({
            textChatId,
            from,
            limit: 50,
        });
    });

    // const props: Omit<VirtuosoProps<string, {}>, keyof ListRootProps> = {
    //     data: messageIds,
    //     alignToBottom: true,
    //     followOutput: true,
    //     customScrollParent: scrollableRef.current ?? undefined,
    //     firstItemIndex: firstMessageIndex,
    //     initialTopMostItemIndex: messageIds.length - 1,
    //     itemContent: (index, id) => renderItem(id, index),
    //     components: {
    //         Header: Header,
    //     },
    //     // defaultItemHeight: 150,
    //     // skipAnimationFrameInResizeObserver: true,
    //     startReached: (index) => {
    //         if (getMessagesHelpers.isFetching) return;
    //         console.log(`start reached: ${index}`);
    //         loadMoreFn({ from: index });
    //     },
    // };


    const count = messageIds.length;

    const getKey = useFunction((index: number) => messageIds[index]!);
    const isScrolledInitially = useRef(false);

    const virtualizer = useVirtualizer({
        count,
        getScrollElement: () => scrollableRef.current,
        estimateSize: () => 150,
        enabled: true,
        getItemKey: getKey,
        useAnimationFrameWithResizeObserver: true,
        onChange: (instance, sync) => {
            if (sync) return;

            console.log(instance.getVirtualIndexes());

            if (!isScrolledInitially.current) {
                isScrolledInitially.current = true;

                console.log('initial scroll to bottom');

                instance.scrollToIndex(count - 1, {
                    align: 'start',
                });
            }
        },
    });

    // useLayoutEffect(() => {
    //     console.log('scroll to bottom');
    //     virtualizer.scrollToIndex(count - 1, {
    //         align: 'end',
    //     });
    // }, [count, virtualizer]);

    const items = virtualizer.getVirtualItems();

    if (!shouldShowMessageList) return null;

    return (
        <div>
            {/* <button
                onClick={() => {
                    virtualizer.scrollToIndex(0);
                }}
            >
                scroll to the top
            </button>

            <span style={{ padding: '0 4px' }}/>

            <button
                onClick={() => {
                    virtualizer.scrollToIndex(count / 2);
                }}
            >
                scroll to the middle
            </button>

            <span style={{ padding: '0 4px' }}/>

            <button
                onClick={() => {
                    virtualizer.scrollToIndex(count - 1);
                }}
            >
                scroll to the end
            </button>

            <span style={{ padding: '0 4px' }}/>

            <button
                onClick={() => {
                    setEnabled((prev) => !prev);
                }}
            >
                turn {enabled ? 'off' : 'on'} virtualizer
            </button>

            <hr/> */}

            <div
                style={{
                    height: virtualizer.getTotalSize(),
                    width: '100%',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        transform: `translateY(${items[0]?.start ?? 0}px)`,
                    }}
                >
                    {items.map((virtualRow) => (
                        <div
                            key={virtualRow.key}
                            data-index={virtualRow.index}
                            ref={virtualizer.measureElement}
                        >
                            {renderItem(
                                messageIds[virtualRow.index]!,
                                virtualRow.index,
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};



// return (
// <Message.RedactorProvider>
//         <Virtuoso {...props}/>
//         {/* <ViewportList
//             viewportRef={scrollableRef}
//             items={messageIds}
//             indexesShift={indexesShift}
//             initialPrerender={20}
//             onViewportIndexesChange={onIndexesChange}
//             initialIndex={messageIds.length - 1}
//             ref={virtualRenderApiRef}
//         >
//             {renderItem}
//         </ViewportList> */}

//         {/* <VirtualList.Node
//             items={messageIds}
//             getId={(v) => v}
//             wrapperRef={feedRef}
//             indexesShift={indexesShift}
//             initialIndex={messageIds.length - 1}
//             onViewportIndexesChange={onIndexesChange}
//             initialPrerender={20}
//             takeInitialIdFrom='end'
//             overscan={3}
//             viewportRef={scrollableRef}
//         >
//             {renderItem}
//         </VirtualList.Node> */}
//     </Message.RedactorProvider>
// );