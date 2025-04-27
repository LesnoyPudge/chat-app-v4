import { ComponentProps, FC, memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
import { ViewportComponentAttributes, Virtualizer, VirtualizerHandle, VirtualizerProps, VList, VListHandle, VListProps } from 'virtua';
import { invariant, sleep } from '@lesnoypudge/utils';
import { FeedDefault } from './subFeeds';


decorate(withDisplayName, 'FeedList', decorate.target);
decorate(memo, decorate.target);

export const FeedList: FC = () => {
    return (
        <>
            <FeedDefault/>
        </>
    );
};

// export const FeedList: FC = () => {
//     const messageIds = useFeedContextSelector((v) => v.messageIds);
//     const {
//         feedRef,
//         shouldShowMessageList,
//         scrollableRef,
//         indexesShift,
//         virtualRenderApiRef,
//         onIndexesChange,
//         shouldShowMessagePlaceholder,
//         textChatId,
//     } = useFeedContextProxy();

//     const renderItem = useFunction((id: string, index: number) => (
//         <FeedItem
//             key={id}
//             previousMessageId={messageIds[index - 1]}
//             messageId={id}
//         />
//     ));

//     // useEffect(() => {
//     //     console.log(indexesShift);
//     // }, [indexesShift]);

//     // useLayoutEffect(() => {
//     //     virtualRenderApiRef.current?.scrollToIndex({
//     //         index: messageIds.length - 1,
//     //     });
//     // }, [messageIds.length, virtualRenderApiRef]);

//     const firstMessageIndex = Store.useSelector(
//         Store.TextChats.Selectors
//             .selectFirstDefinedMessageIndexById(textChatId),
//     );

//     const Header = useMemo(() => () => (
//         <>
//             <FeedIntroduction/>

//             <If condition={shouldShowMessagePlaceholder}>
//                 <FeedPlaceholder/>
//             </If>
//         </>
//     ), [shouldShowMessagePlaceholder]);

//     const [
//         getMessagesTrigger,
//         getMessagesHelpers,
//     ] = Store.Messages.Api.useLazyMessageGetManyByTextChatIdQuery();

//     const loadMoreFn = useFunction(async ({
//         from,
//     }: { from: number | null }) => {
//         if (getMessagesHelpers.isFetching) return;

//         setStartFetching(true);
//         console.log('fetch more', firstMessageIndex);
//         isShifting.current = true;
//         await getMessagesTrigger({
//             textChatId,
//             from,
//             limit: 50,
//         });

//         setStartFetching(false);
//     });



//     const isShifting = useRef(false);
//     const virtualRef = useRef<VirtualizerHandle>(null);
//     const isPrepend = useRef(false);
//     const shouldStickToBottom = useRef(true);
//     const prevLastIndex = useRef<number>();
//     const prevFirstIndex = useRef<number>();
//     const isCollapsed = useRef(false);
//     const count = messageIds.length;

//     // update refs on rerender
//     useEffect(() => {
//         prevFirstIndex.current = firstMessageIndex;
//     }, [firstMessageIndex]);

//     useEffect(() => {
//         isShifting.current = false;
//     }, []);

//     // shift in place
//     // useLayoutEffect(() => {
//     //     if (!virtualRef.current) return;
//     //     const isAtBottom = virtualRef.current.findStartIndex() === count - 1;
//     //     if (isAtBottom) return;
//     //     if (firstMessageIndex === undefined) return;
//     //     if (prevFirstIndex.current === undefined) return;

//     //     isShifting.current = true;

//     //     // const diff = prevFirstIndex.current - firstMessageIndex;
//     //     // invariant(diff >= 0);

//     //     // setShift((prev) => (prev ?? 0) + diff);

//     //     // if (isCollapsed.current) {
//     //     //     virtualRenderApiRef.current?.scrollToIndex({
//     //     //         index: diff,
//     //     //         alignToTop: true,
//     //     //     });
//     //     // }
//     // }, [firstMessageIndex, virtualRenderApiRef, count]);

//     // useEffect(() => {
//     //     isShifting.current = false;
//     // });

// type Props = (
//     // T.Except<VListProps, 'children' | keyof ViewportComponentAttributes>
//     & T.Except<VirtualizerProps, 'children'>
//     & Pick<ComponentProps<typeof Virtualizer>, 'ref'>
// );


//     // const [shifting, setShifting] = useState(false);
//     const [startFetching, setStartFetching] = useState(false);
//     const [endFetching, setEndFetching] = useState(false);

//     const ITEM_BATCH_COUNT = 100;
//     const THRESHOLD = 50;
//     const startFetchedCountRef = useRef(-1);
//     const endFetchedCountRef = useRef(-1);
//     const ready = useRef(false);

//     useEffect(() => {
//         virtualRef.current?.scrollToIndex(count - 1);
//         ready.current = true;
//     }, []);

//     const spinnerHeight = 100;


// const props: Props = {
//     scrollRef: scrollableRef,
//     ref: virtualRef,
//     // shift: isShifting.current,
//     shift: true,
//     // startMargin: spinnerHeight,
//     count,
//     overscan: 3,
//     onScroll: async () => {
//         if (!ready.current) return;
//         if (!virtualRef.current) return;

//         const isAtTop = virtualRef.current.findStartIndex() === 0;

//         if (isAtTop) {
//             if (firstMessageIndex === 0) return;
//             startFetchedCountRef.current = count;


//             await loadMoreFn({
//                 from: firstMessageIndex ?? null,
//             });

//             // setItems((prev) => [...createRows(ITEM_BATCH_COUNT).reverse(), ...prev]);
//         }
//     },



//         // ref: virtualRef,
//         // scrollRef: scrollableRef,
//         // // reverse: true,
//         // count: messageIds.length,
//         // shift: isPrepend.current,
//         // overscan: 3,
//         // onScroll: (offset) => {
//         //     const virtual = virtualRef.current;
//         //     if (!virtual) return;

//         //     const diff = (
//         //         offset
//         //         - virtual.scrollSize
//         //         + virtual.viewportSize
//         //     );
//         //     // console.log('onScroll', diff);
//         //     shouldStickToBottom.current = diff >= -1.5;

//         //     if (offset < 100) {
//         //         if (firstMessageIndex === undefined) return;
//         //         if (firstMessageIndex === 0) return;

//         //         console.log('load more');
//         //         loadMoreFn({
//         //             from: firstMessageIndex,
//         //         });
//         //     }
//         // },
//     };


//     if (!shouldShowMessageList) return null;
//     return (
//         <div style={{
//             // opt out browser's scroll anchoring on header/footer because it will conflict to scroll anchoring of virtualizer
//             overflowAnchor: 'none',
//         }}>
//             {/* <div
//                 style={startFetching ? undefined : {
//                     height: spinnerHeight,
//                     visibility: 'hidden',
//                 }}
//             >
//                 <>spinner</>
//             </div> */}
//             <Virtualizer
//                 // style={{
//                 //     flex: 1,
//                 // }}

//                 {...props}
//             >
//                 {(index) => renderItem(messageIds[index]!, index)}
//             </Virtualizer>
//             {/* <div
//                 style={endFetching ? undefined : {
//                     height: spinnerHeight,
//                     visibility: 'hidden',
//                 }}
//             >
//                 <>spinner</>
//             </div> */}
//         </div>
//     );
// };


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


// const count = messageIds.length;

// const getKey = useFunction((index: number) => messageIds[index]!);
// const isScrolledInitially = useRef(false);

// const virtualizer = useVirtualizer({
//     count,
//     getScrollElement: () => scrollableRef.current,
//     estimateSize: () => 150,
//     enabled: true,
//     getItemKey: getKey,
//     useAnimationFrameWithResizeObserver: true,
//     onChange: (instance, sync) => {
//         if (sync) return;

//         // console.log(instance.getVirtualIndexes());

//         const offset = instance.getOffsetForIndex(count - 1);

//         if (!isScrolledInitially.current && offset?.[0]) {
//             isScrolledInitially.current = true;

//             instance.scrollToIndex(count - 1, {
//                 align: 'start',
//             });
//         }
//     },
// });

// useLayoutEffect(() => {
//     console.log('scroll to bottom');
//     virtualizer.scrollToIndex(count - 1, {
//         align: 'end',
//     });
// }, [count, virtualizer]);

// const items = virtualizer.getVirtualItems();



{ /* <div
                style={{
                    height: virtualizer.getTotalSize(),
                    width: '100%',
                    position: 'relative',
                    transform: 'translate',
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
            </div> */ }