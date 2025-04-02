import { KeyboardNavigation, Scrollable, VirtualList, VirtualRender } from '@/components';
import { decorate } from '@lesnoypudge/macro';
import { combinedFunction, noop } from '@lesnoypudge/utils';
import { ContextSelectable, Focus, useBoolean, useEventListener, useInterval, useRefManager, useScrollIntoView, withDisplayName } from '@lesnoypudge/utils-react';
import { FC, memo, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { ViewportList, ViewportListRef } from 'react-viewport-list';


decorate(withDisplayName, 'Item', decorate.target);
decorate(memo, decorate.target);
const Item: FC<{
    item: string;
    onClick?: VoidFunction;
}> = ({
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
            <> - {String(Math.random())}</>
        </button>
    );
};

export const Virtual: FC = () => {
    const scrollableRef = useRefManager<HTMLDivElement>(null);
    const apiRef = useRefManager<ViewportListRef>(null);
    const wrapperRef = useRefManager<HTMLDivElement>(null);

    const [arr, setArr] = useState(() => {
        return Array.from({ length: 100 }).map((_, i) => String(i));
    });

    useInterval(() => {
        setArr((prev) => [String(100 - prev.length - 1), ...prev]);
    }, 5_500);

    // const {
    //     setVirtualIndexes,
    //     virtualList,
    // } = VirtualRender.useVirtualArray(arr);

    const bool = useBoolean(false);

    // useEffect(() => {
    //     console.log(virtualList);
    // }, [virtualList]);


    return (
        <div className='flex flex-col gap-2'>
            <div className='text-center'>wow</div>

            <If condition={bool.value}>
                <button onClick={bool.toggle}>go back</button>
            </If>

            <If condition={!bool.value}>
                <button>home page button</button>

                <Scrollable scrollableRef={scrollableRef}>
                    <div className='flex flex-col gap-2' ref={wrapperRef}>
                        {/* <VirtualList
                            items={arr}
                            apiRef={apiRef}
                            getId={String}
                            wrapperRef={wrapperRef}
                            itemSize={24}
                            indexesShift={Math.abs(50 - arr.length)}
                        >
                            {(item) => <Item item={item}/>}
                        </VirtualList> */}
                    </div>
                </Scrollable>
            </If>
        </div>
    );
};