import React, { FC,
    CSSProperties,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    Fragment } from 'react';

import { faker } from '@faker-js/faker';
import { Virtualizer, VList, VListHandle } from 'virtua';
import { combinedFunction, inRange, invariant, sleep } from '@lesnoypudge/utils';
import { useFeedContextProxy } from '../../../context';
import { FeedPlaceholder } from '../../FeedPlaceholder';
import { FeedItem } from '../../FeedItem';
import { Store } from '@/features';
import { useEventListener, useFunction, useLatest, usePrevious, usePropsChange, useRefManager } from '@lesnoypudge/utils-react';
import { FeedIntroduction } from '../../FeedIntroduction';
import { ViewportList, ViewportListRef } from 'src/components/common/VirtualRender/components/VirtualRenderList/components';
import { Scrollable } from 'src/components/common/Scrollable';
import { Message } from 'src/components/common/Message';


type Data = {
    id: string;
    value: string;
    me: boolean;
    index: number;
};

const itemStyle: CSSProperties = {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    whiteSpace: 'pre-wrap',
};

const h = new Map<string, number>();

const Item = ({ id, value, me, index }: Data) => {
    if (!h.has(id)) {
        const height = 40 + Math.floor(
            inRange(0, Math.max(50, index) / 2) + inRange(0, 35),
        );

        h.set(id, height);
    }

    return (
        <div
            style={{
                ...itemStyle,
                ...(me
                    ? { marginLeft: 80 }
                    : { marginRight: 80 }
                ),
                height: h.get(id),

            }}
        >
            {id}
            {/* {value} */}
        </div>
    );
};

const allItems = Array.from({ length: 200 }, (_, index) => {
    return {
        id: `${index}---${Math.random()}`,
        index,
        me: false,
        value: 'qwezxc',
    } satisfies Data;
});

const AT_BOTTOM_THRESHOLD = -1.5;
const VISIBLE_ELEMENT_INDEX_TO_LOAD_MORE = 1;

const FeedDefaultWORKING: FC = () => {
    const [oldItems, setItems] = useState(() => allItems.slice(-50));
    const [myItems, setMyItems] = useState<Data[]>([]);
    const combinedItems = [...oldItems, ...myItems];
    const {
        scrollableRef,
        messagePlaceholderHeight,
        textChatId,
        virtualizerRef,
        loadMore,
        // shouldShowMessagePlaceholder,
    } = useFeedContextProxy();

    // const messageIds = Store.useSelector(
    //     Store.TextChats.Selectors.selectDefinedMessageIdsById(textChatId),
    // );
    // invariant(messageIds);
    const count = combinedItems.length;
    const isPrepend = useRef(false);
    const isAtBottomRef = useRef(true);

    const [value, setValue] = useState('Hello world!');

    useLayoutEffect(() => {
        isPrepend.current = false;
    });

    useLayoutEffect(() => {
        const virtualizer = virtualizerRef.current;
        if (!virtualizer) return;
        if (!isAtBottomRef.current) return;

        const lastItemIndex = count - 1;

        virtualizer.scrollToIndex(lastItemIndex, {
            align: 'start',
            offset: virtualizer.scrollSize,
        });
    }, [count, virtualizerRef]);

    const disabled = !value.length;
    const submit = () => {
        if (disabled) return;
        const savedValue = value;

        setValue('Loading...');

        void sleep(500).then(() => {
            isAtBottomRef.current = true;
            setMyItems((prev) => [...prev, {
                id: `${count}---new item`,
                index: count,
                me: true,
                value: savedValue,
            }]);
            setValue('');
        });

        // setItems((p) => [...p, createItem({ value, me: true })]);
        // setValue('');
    };
    const isFetching = useRef(false);
    const lastVisibleIndexBeforeMarginRemoval = useRef(0);
    const lastVisibleStatsBeforeMarginRemoval = useRef({
        index: 0,
        offset: 0,
    });

    const handleScroll = useFunction((offset: number) => {
        const virtualizer = virtualizerRef.current;
        if (!virtualizer) return;

        const diff = (
            offset
            - virtualizer.scrollSize
            + virtualizer.viewportSize
        );

        isAtBottomRef.current = diff >= AT_BOTTOM_THRESHOLD;

        const firstIndex = virtualizer.findStartIndex();
        const isAtTop = firstIndex <= VISIBLE_ELEMENT_INDEX_TO_LOAD_MORE;
        // console.log({
        //     firstIndex,
        //     isAtTop,
        //     isFetching: isFetching.current,
        //     first: combinedItems[0]?.index === 0,
        // });
        if (!isAtTop) return;
        // if (!firstMessageIndex) return;

        if (isFetching.current) return;

        const firstCurrentMessage = combinedItems[0];
        if (!firstCurrentMessage) return;
        if (firstCurrentMessage.index === 0) return;

        isFetching.current = true;

        void sleep(1_500).then(() => {
            isFetching.current = false;
            console.log('set old items');
            isPrepend.current = true;

            if (firstCurrentMessage.index === 50) {
                lastVisibleStatsBeforeMarginRemoval.current = {
                    index: firstCurrentMessage.index,
                    offset: virtualizer.scrollOffset - messagePlaceholderHeight,
                };
            }

            setItems((prev) => {
                return [
                    ...allItems.slice(
                        -(50 + prev.length),
                        -prev.length,
                    ),
                    ...prev,
                ];
            });
        });
    });

    const renderItem = useFunction((index: number) => {
        const message = combinedItems[index];
        invariant(message);

        return (
            <Fragment key={message.id}>
                <FeedItem
                    messageId={message.id}
                    previousMessageId={combinedItems[index - 1]?.id}
                    index={message.index}
                />
            </Fragment>
        );
    });


    const shouldShowMessagePlaceholder = combinedItems[0]?.index !== 0;

    const startMargin = (
        shouldShowMessagePlaceholder
            ? messagePlaceholderHeight
            : 0
    );

    useLayoutEffect(() => {
        const virtualizer = virtualizerRef.current;
        if (!virtualizer) return;
        if (shouldShowMessagePlaceholder) return;

        console.log('try to stabilize scroll', lastVisibleIndexBeforeMarginRemoval.current);
        // virtualizer.scrollBy(-messagePlaceholderHeight);
        // virtualizer.scrollToIndex(lastVisibleIndexBeforeMarginRemoval.current);

        // virtualizer.scrollToIndex(50, {
        //     align: 'start',
        //     offset: lastVisibleIndexBeforeMarginRemoval.current,
        // });

        const stats = lastVisibleStatsBeforeMarginRemoval.current;

        virtualizer.scrollToIndex(stats.index, {
            align: 'start',
            offset: stats.offset,
        });
    }, [
        shouldShowMessagePlaceholder,
        virtualizerRef,
        messagePlaceholderHeight,
    ]);

    usePropsChange({
        scrollableRef: scrollableRef.current,
        messagePlaceholderHeight,
        textChatId,
        virtualizerRef: virtualizerRef.current,
        loadMore,
        shouldShowMessagePlaceholder,
        combinedItems,
        startMargin,
        count,
        isPrepend: isPrepend.current,
        isAtBottomRef: isAtBottomRef.current,
    });

    return (
        <div style={{ overflowAnchor: 'none' }}>
            <If condition={shouldShowMessagePlaceholder}>
                <FeedPlaceholder/>
            </If>

            <Virtualizer
                scrollRef={scrollableRef}
                count={count}
                ref={virtualizerRef}
                startMargin={startMargin}
                itemSize={40}
                // shift={true}
                shift={isPrepend.current}
                onScroll={handleScroll}
                overscan={3}
            >
                {renderItem}
            </Virtualizer>

            <form
                className='visible'
                style={{ padding: 10 }}
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    submit();
                }}
            >
                <textarea
                    style={{ width: 400 }}
                    rows={6}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.code === 'Enter' && (e.ctrlKey || e.metaKey)) {
                            submit();
                            e.preventDefault();
                        }
                    }}
                />
                <button type='submit' disabled={disabled}>
                    submit
                </button>
                <button
                    type='button'
                    onClick={() => {
                        virtualizerRef.current?.scrollTo(0);
                    }}
                >
                    jump to top
                </button>
            </form>
        </div>
    );
};

const FeedDefaultWIP: FC = () => {
    const {
        scrollableRef,
        messagePlaceholderHeight,
        textChatId,
        virtualizerRef,
        loadMore,
        shouldShowMessagePlaceholder,
    } = useFeedContextProxy();

    const messageIds = Store.useSelector(
        Store.TextChats.Selectors.selectDefinedMessageIdsById(textChatId),
    );
    invariant(messageIds);

    const count = messageIds.length;
    const isPrepend = useRef(false);
    const isAtBottomRef = useRef(true);

    useLayoutEffect(() => {
        isPrepend.current = false;
    });

    useLayoutEffect(() => {
        const virtualizer = virtualizerRef.current;
        if (!virtualizer) return;
        if (!isAtBottomRef.current) return;

        const lastItemIndex = count - 1;

        virtualizer.scrollToIndex(lastItemIndex, {
            align: 'start',
            offset: virtualizer.scrollSize,
        });
    }, [count, virtualizerRef]);

    const isFetching = useRef(false);
    const lastVisibleStatsBeforeMarginRemoval = useRef({
        index: 0,
        offset: 0,
    });

    const firstMessageIndex = Store.useSelector(
        Store.TextChats.Selectors
            .selectFirstDefinedMessageIndexById(textChatId),
    );

    const handleScroll = useFunction((offset: number) => {
        const virtualizer = virtualizerRef.current;
        if (!virtualizer) return;

        const diff = (
            offset
            - virtualizer.scrollSize
            + virtualizer.viewportSize
        );

        isAtBottomRef.current = diff >= AT_BOTTOM_THRESHOLD;

        if (!firstMessageIndex) return;
        if (isFetching.current) return;

        const firstIndex = virtualizer.findStartIndex();
        const isAtTop = firstIndex <= VISIBLE_ELEMENT_INDEX_TO_LOAD_MORE;

        if (!isAtTop) return;

        isFetching.current = true;

        // @ts-expect-error
        void loadMore({ from: firstMessageIndex }).unwrap().then(() => {
            console.log('set old items');

            isFetching.current = false;
            isPrepend.current = true;

            if (firstMessageIndex === 50) {
                lastVisibleStatsBeforeMarginRemoval.current = {
                    index: firstMessageIndex,
                    offset: virtualizer.scrollOffset - messagePlaceholderHeight,
                };
            }
        });
    });

    const renderItem = useFunction((index: number) => {
        const prevId = messageIds[index - 1];
        const id = messageIds[index];
        invariant(id);

        const isFirst = (
            (index === 0)
            && firstMessageIndex === 0
        );

        return (
            <Fragment key={id}>
                <If condition={isFirst}>
                    <FeedIntroduction/>
                </If>

                <FeedItem
                    messageId={id}
                    previousMessageId={prevId}
                />
            </Fragment>
        );
    });

    const startMargin = (
        shouldShowMessagePlaceholder
            ? messagePlaceholderHeight
            : 0
    );

    useLayoutEffect(() => {
        const virtualizer = virtualizerRef.current;
        if (!virtualizer) return;
        if (shouldShowMessagePlaceholder) return;

        console.log('try to stabilize scroll');
        const stats = lastVisibleStatsBeforeMarginRemoval.current;

        virtualizer.scrollToIndex(stats.index, {
            align: 'start',
            offset: stats.offset,
        });
    }, [
        shouldShowMessagePlaceholder,
        virtualizerRef,
        messagePlaceholderHeight,
    ]);

    // const prevFirstIndex = usePrevious(firstMessageIndex);

    // const shift = (
    //     (prevFirstIndex !== undefined)
    //     && (prevFirstIndex !== firstMessageIndex)
    // );

    usePropsChange({
        scrollableRef: scrollableRef.current,
        messagePlaceholderHeight,
        textChatId,
        virtualizerRef: virtualizerRef.current,
        loadMore,
        shouldShowMessagePlaceholder,
        messageIds,
        startMargin,
        count,
        isPrepend: isPrepend.current,
        isAtBottomRef: isAtBottomRef.current,
    });

    return (
        <div style={{ overflowAnchor: 'none' }}>
            <If condition={shouldShowMessagePlaceholder}>
                <FeedPlaceholder/>
            </If>

            <Virtualizer
                scrollRef={scrollableRef}
                count={count}
                ref={virtualizerRef}
                startMargin={startMargin}
                itemSize={40}
                // shift={true}
                shift={isPrepend.current}
                // shift={shift}
                onScroll={handleScroll}
                overscan={3}
            >
                {renderItem}
            </Virtualizer>
        </div>
    );
};

const useExternalData = () => {
    const {
        scrollableRef,
        textChatId,
        loadMore,
        shouldShowMessagePlaceholder,
        feedRef,
    } = useFeedContextProxy();

    const messageIds = Store.useSelector(
        Store.TextChats.Selectors.selectDefinedMessageIdsById(textChatId),
    );
    invariant(messageIds);

    const count = messageIds.length;

    const firstMessageIndex = Store.useSelector(
        Store.TextChats.Selectors
            .selectFirstDefinedMessageIndexById(textChatId),
    );

    const lastMessageIndex = Store.useSelector(
        Store.TextChats.Selectors
            .selectLastDefinedMessageIndexById(textChatId),
    );

    return {
        scrollableRef,
        // virtualizerRef,
        loadMore,
        shouldShowMessagePlaceholder,
        count,
        firstMessageIndex,
        lastMessageIndex,
        messageIds,
        feedRef,
    };
};

const LOAD_MORE_THRESHOLD = 3;
const SCROLL_AT_BOTTOM_THRESHOLD = 4;
const OVERSCAN = 3;
const ITEM_SIZE_ESTIMATE = 40;
const SCROLL_TO_BOTTOM_EXTRA_OFFSET = 9_999;
const PRERENDER = Math.floor(
    document.documentElement.clientHeight
    / ITEM_SIZE_ESTIMATE,
);

const FeedDifferent: FC = () => {
    const {
        count,
        firstMessageIndex,
        lastMessageIndex,
        loadMore,
        scrollableRef,
        shouldShowMessagePlaceholder,
        messageIds,
        feedRef,
    } = useExternalData();

    const scrollableApiRef = useRefManager<Scrollable.Api>(null);
    const virtualizerRef = useRef<ViewportListRef>(null);
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

    const renderItem = useFunction((index: number) => {
        const prevId = messageIds[index - 1];
        const id = messageIds[index];
        invariant(id);

        const isFirst = (
            (index === 0)
            && firstMessageIndex === 0
        );

        return (
            <Fragment key={id}>
                <If condition={isFirst}>
                    <FeedIntroduction/>
                </If>

                <FeedItem
                    messageId={id}
                    previousMessageId={prevId}
                />
            </Fragment>
        );
    });

    return (
        <Scrollable
            className='h-full'
            scrollableRef={scrollableRef}
            apiRef={scrollableApiRef}
        >
            <div
                role='feed'
                aria-busy
                ref={feedRef}
                style={{
                    // visibility: 'hidden', // TODO replace with other optimization methods
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    minHeight: '100%',
                }}
            >
                <div style={{ overflowAnchor: 'none' }}>
                    <If condition={shouldShowMessagePlaceholder}>
                        <FeedPlaceholder/>
                    </If>

                    <Message.RedactorProvider>
                        <ViewportList
                            count={count}
                            initialIndex={count - 1}
                            viewportRef={scrollableRef}
                            ref={virtualizerRef}
                            overscan={OVERSCAN}
                            overflowAnchor='none'
                            itemSize={ITEM_SIZE_ESTIMATE}
                            initialPrerender={PRERENDER}
                            onViewportIndexesChange={onViewportIndexesChange}
                        >
                            {renderItem}
                        </ViewportList>
                    </Message.RedactorProvider>
                </div>
            </div>
        </Scrollable>
    );
};

export const FeedDefault = FeedDifferent;