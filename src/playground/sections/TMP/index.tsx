import { KeyboardNavigation, Scrollable, VirtualRender } from '@/components';
import { useKeyboardNavigation } from '@/hooks';
import { combinedFunction, noop } from '@lesnoypudge/utils';
import { ContextSelectable, Focus, useBoolean, useEventListener, useInterval, useRefManager, useScrollIntoView } from '@lesnoypudge/utils-react';
import { FC, memo, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { ViewportList, ViewportListRef } from 'react-viewport-list';



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
    } = KeyboardNavigation.useCommonItem({ elementRef: ref, itemId: item });

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

    const [arr, setArr] = useState(() => {
        return Array.from({ length: 100 }).map((_, i) => String(i));
    });

    useInterval(() => {
        setArr((prev) => [...prev, String(prev.length)]);
    }, 1_500);

    const {
        setVirtualIndexes,
        virtualList,
    } = VirtualRender.useVirtualArray(arr);

    const bool = useBoolean(false);

    return (
        <div className='flex flex-col gap-2'>
            <div className='text-center'>wow</div>

            <If condition={bool.value}>
                <button onClick={bool.toggle}>go back</button>
            </If>

            <If condition={!bool.value}>

                <KeyboardNavigation.Provider
                    list={virtualList}
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
                                onViewportIndexesChange={setVirtualIndexes}
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