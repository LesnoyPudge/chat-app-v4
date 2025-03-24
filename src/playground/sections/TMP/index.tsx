import { Scrollable, VirtualRender } from '@/components';
import { useKeyboardNavigation } from '@/hooks';
import { ContextSelectable, Focus, useBoolean, useRefManager, useScrollIntoView } from '@lesnoypudge/utils-react';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { ViewportList, ViewportListRef } from 'react-viewport-list';



const arr = Array.from({ length: 100 }).map((_, i) => String(i));

const KeyboardNavigationContext = ContextSelectable.createContext<
    useKeyboardNavigation.Return
>();

const Item: FC<{
    item: string;
    onClick?: VoidFunction;
}> = memo(({
    item,
    onClick,
}) => {
    const ref = useRefManager<HTMLButtonElement>(null);
    const {
        getIsFocused,
        getTabIndex,
        setCurrentFocusedId,
    } = ContextSelectable.useProxy(KeyboardNavigationContext);

    const isFocused = getIsFocused(item);

    Focus.useMoveFocusInside({
        containerRef: ref,
        isEnabled: isFocused,
    });

    useScrollIntoView(ref, {
        enabled: isFocused,
    });

    return (
        <button
            onClick={onClick}
            ref={ref}
            tabIndex={getTabIndex(item)}
        >
            <>item: {item} - ({getTabIndex(item)})</>
            <> - {String(isFocused)}</>
        </button>
    );
});

export const TMP: FC = () => {
    const scrollableRef = useRefManager<HTMLDivElement>(null);
    const apiRef = useRefManager<ViewportListRef>(null);
    const wrapperRef = useRefManager<HTMLDivElement>(null);
    const [visibleList, setVisibleList] = useState<string[]>(arr);
    const value = useKeyboardNavigation(wrapperRef, {
        direction: 'vertical',
        list: visibleList,
        loop: false,
        initialFocusedId: '40',
        onFocusChange: (value) => {
            console.log(value);
        },
    });
    const bool = useBoolean(false);

    useEffect(() => {
        const api = apiRef.current;
    }, [apiRef]);

    return (
        <div className='flex flex-col gap-2'>
            <div className='text-center'>wow {value.currentFocusedId}</div>

            <If condition={bool.value}>
                <button onClick={bool.toggle}>go back</button>
            </If>

            <If condition={!bool.value}>

                <KeyboardNavigationContext.Provider value={value}>
                    <button>home page button</button>

                    <Scrollable
                        scrollableRef={scrollableRef}
                        // scrollableRef={scrollableRef}
                    >
                        <div className='flex flex-col gap-2' ref={wrapperRef}>
                            <ViewportList
                                items={arr}
                                // apiRef={apiRef}
                                viewportRef={scrollableRef}
                                // getId={String}
                                itemSize={24}
                                indexesShift={0}
                                initialAlignToTop={true}
                                initialPrerender={10}
                                overscan={3}
                                initialIndex={(() => {
                                    if (!value.currentFocusedId) return;

                                    const index = Number.parseInt(value.currentFocusedId);

                                    console.log(`initial index: ${index}`);

                                    return index;
                                })()}
                                onViewportIndexesChange={([start, end]) => {
                                    console.log(`start: ${start}, end: ${end}`);
                                    console.log(`list length: ${end - start}`);

                                    setVisibleList(arr.slice(start, end));
                                }}
                            >
                                {(item) => (
                                    <Item
                                        key={item}
                                        onClick={bool.toggle}
                                        item={item}
                                    />
                                )}
                            </ViewportList>
                        </div>
                    </Scrollable>
                </KeyboardNavigationContext.Provider>
            </If>
        </div>
    );
};