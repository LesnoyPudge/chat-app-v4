import { KeyboardNavigation, Scrollable, VirtualRender } from '@/components';
import { useKeyboardNavigation, useVirtualListItem } from '@/hooks';
import { combinedFunction, noop } from '@lesnoypudge/utils';
import { ContextSelectable, Focus, useBoolean, useEventListener, useRefManager, useScrollIntoView } from '@lesnoypudge/utils-react';
import { FC, memo, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { ViewportList, ViewportListRef } from 'react-viewport-list';



const arr = Array.from({ length: 100 }).map((_, i) => String(i));


const Item: FC<{
    item: string;
    onClick?: VoidFunction;
}> = memo(({
    item,
    onClick = noop,
}) => {
    const ref = useRefManager<HTMLButtonElement>(null);
    const {
        isCurrentId,
        isFocused,
        setFocusId,
        tabIndex,
    } = useVirtualListItem({ elementRef: ref, itemId: item });

    return (
        <button
            className={isCurrentId ? 'bg-red-950' : ''}
            onClick={combinedFunction(onClick, setFocusId)}
            ref={ref}
            tabIndex={tabIndex}
        >
            <>item: {item} - </>
            (tabIndex)
            <> - {String(isFocused)}</>
        </button>
    );
});

export const TMP: FC = () => {
    const scrollableRef = useRefManager<HTMLDivElement>(null);
    const apiRef = useRefManager<ViewportListRef>(null);
    const wrapperRef = useRefManager<HTMLDivElement>(null);
    const [visibleList, setVisibleList] = useState<string[]>(arr);
    const bool = useBoolean(false);

    useEffect(() => {
        const api = apiRef.current;
    }, [apiRef]);

    return (
        <div className='flex flex-col gap-2'>
            <div className='text-center'>wow</div>

            <If condition={bool.value}>
                <button onClick={bool.toggle}>go back</button>
            </If>

            <If condition={!bool.value}>

                <KeyboardNavigation.Provider
                    list={visibleList}
                    wrapperRef={wrapperRef}
                >
                    <button>home page button</button>

                    <Scrollable scrollableRef={scrollableRef}>
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
                                // initialIndex={(() => {
                                //     if (!value.currentFocusedId) return;

                                //     const index = Number.parseInt(value.currentFocusedId);

                                //     console.log(`initial index: ${index}`);

                                //     return index;
                                // })()}
                                onViewportIndexesChange={([start, end]) => {
                                // console.log(`start: ${start}, end: ${end}`);
                                // console.log(`list length: ${end - start}`);

                                    setVisibleList(arr.slice(start, end + 1));
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
                </KeyboardNavigation.Provider>
            </If>
        </div>
    );
};