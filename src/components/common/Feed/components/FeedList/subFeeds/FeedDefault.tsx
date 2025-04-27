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
import { inRange, invariant, sleep } from '@lesnoypudge/utils';
import { useFeedContextProxy } from '../../../context';
import { FeedPlaceholder } from '../../FeedPlaceholder';
import { FeedItem } from '../../FeedItem';


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

export const FeedDefault: FC = () => {
    const [oldItems, setItems] = useState(() => allItems.slice(-50));
    const [myItems, setMyItems] = useState<Data[]>([]);
    const combinedItems = [...oldItems, ...myItems];

    const ref = useRef<VListHandle>(null);

    const isPrepend = useRef(false);
    const shouldStickToBottom = useRef(true);

    const [value, setValue] = useState('Hello world!');

    useLayoutEffect(() => {
        isPrepend.current = false;
    });

    useEffect(() => {
        const virtualizer = ref.current;
        if (!virtualizer) return;
        if (!shouldStickToBottom.current) return;
        console.log('scroll to bottom');

        // const lastItemSize = virtualizer.getItemSize(
        //     combinedItems.length - 1,
        // );

        console.log(virtualizer.scrollSize);
        virtualizer.scrollToIndex(combinedItems.length - 1, {
            align: 'end',
            // offset: 99_999,
        });
        virtualizer.scrollBy(99_999);
    }, [combinedItems.length]);

    useEffect(() => {
        // let canceled = false;
        // let timer: ReturnType<typeof setTimeout> | null = null;
        // const setTimer = () => {
        //     timer = setTimeout(() => {
        //         if (canceled) return;
        //         setItems((p) => [...p, createItem()]);
        //         setTimer();
        //     }, 1_500);
        // };
        // setTimer();
        // return () => {
        //     canceled = true;
        //     if (timer) {
        //         clearTimeout(timer);
        //     }
        // };
    }, []);

    const disabled = !value.length;
    const submit = () => {
        if (disabled) return;
        const savedValue = value;

        setValue('Loading...');

        void sleep(500).then(() => {
            shouldStickToBottom.current = true;
            setMyItems((prev) => [...prev, {
                id: `${combinedItems.length}---new item`,
                index: combinedItems.length,
                me: true,
                value: savedValue,
            }]);
            setValue('');
        });

        // setItems((p) => [...p, createItem({ value, me: true })]);
        // setValue('');
    };
    const isFetching = useRef(false);

    const {
        scrollableRef,
    } = useFeedContextProxy();

    return (
        <>
            <Virtualizer
                scrollRef={scrollableRef}
                count={combinedItems.length}
                ref={ref}
                // style={{ flex: 1 }}
                // reverse={false}
                itemSize={0}
                shift={isPrepend.current}
                onScroll={(offset) => {
                    if (!ref.current) return;
                    shouldStickToBottom.current
      = offset - ref.current.scrollSize + ref.current.viewportSize
                        // FIXME: The sum may not be 0 because of sub-pixel value when browser's window.devicePixelRatio has decimal value
          >= -1.5;

                    if (offset < 100) {
                        if (isFetching.current) return;
                        if (combinedItems[0]?.index === 0) return;

                        isFetching.current = true;

                        void sleep(1_500).then(() => {
                            isFetching.current = false;
                            console.log('set old items');
                            isPrepend.current = true;

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
                    }
                }}
            >
                {(index) => {
                    const message = combinedItems[index];
                    invariant(message);

                    // if (index % 2 === 0) return (
                    //     <div className='sr-only h-px'></div>
                    // );

                    return (
                        <FeedItem
                            key={message.id}
                            messageId={message.id}
                            previousMessageId={combinedItems[index - 1]?.id}
                            index={message.index}
                        />
                    );

                    // return (
                    //     <Item key={message.id} {...message}/>
                    // );
                }}
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
                        ref.current?.scrollTo(0);
                    }}
                >
                    jump to top
                </button>
            </form>
        </>
    );
};