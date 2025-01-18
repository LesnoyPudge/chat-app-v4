import { Button, Dialog, Form, Overlay, Placeholder, Tooltip, ContextMenu, Avatar, Image, Scrollable, Modal, RelativelyPositioned, Iterate, PresenceStatus } from '@components';
import { useKeyboardNavigation, usePropsChange } from '@hooks';
import { Screen } from '@layouts/bundled';
import { inRange, isCallable, noop } from '@lesnoypudge/utils';
import { ContextConsumerProxy, Focus, Memo, RefManager, useBoolean, useContextProxy, useEventListener, useFunction, useRefManager, useTimeout } from '@lesnoypudge/utils-react';
import { Features } from '@redux/features';
import { useSliceActions, useSliceSelector, useStoreSelector } from '@redux/hooks';
import { RootState } from '@redux/store';
import { formatNotificationCount } from '@utils';
import { env, MASK_ID } from '@vars';
import { AnimatePresence, m } from 'motion/react';
import { FC, Fragment, memo, PropsWithChildren, useEffect, useRef, useState } from 'react';


const defaultArr = ['1', '2', '3', '4', '5'];

const Item: FC<{
    item: string;
    index: number;
    tabIndex: number;
    isFocused: boolean;
    setFocusId: (newId: string) => void;
    shuffle: VoidFunction;
    remove: (index: number) => void;
}> = (props) => {
    const {
        index,
        item,
        isFocused,
        setFocusId,
        tabIndex,
        shuffle,
        remove,
    } = props;

    useEffect(() => {
        console.log(`effect in ${item}`);
    });

    const buttonRef = useRefManager<HTMLButtonElement>(null);

    const handleClick = useFunction(() => {
        const fn = (
            (index % 2 === 0)
                ? () => remove(index)
                : shuffle
        );

        fn();
    });

    const setFocus = useFunction(() => {
        setFocusId(item);
    });

    return (
        <Focus.Inside
            isEnabled={isFocused}
            containerRef={buttonRef}
        >
            <Button
                onLeftClick={handleClick}
                onAnyClick={setFocus}
                tabIndex={tabIndex}
                innerRef={buttonRef}
            >
                <>{(index % 2 === 0) ? 'remove' : 'shuffle'} </>
                <>item: {item}</>

                <If condition={isFocused}>
                    <> is active</>
                </If>
            </Button>
        </Focus.Inside>
    );
};

export const Playground: FC = () => {
    const [arr, setArr] = useState<string[]>([...defaultArr]);
    const wrapperRef = useRefManager<HTMLDivElement>(null);
    const {
        currentFocusedId,
        getIsFocused,
        getTabIndex,
        setCurrentFocusedId,
    } = useKeyboardNavigation(wrapperRef, {
        direction: 'vertical',
        list: arr,
        loop: false,
    });

    useEffect(() => {
        console.log(`EFF ${currentFocusedId}`);
    });

    // useTimeout(() => {
    //     setArr([...defaultArr]);
    // }, 3_000);

    const shuffle = useFunction(() => {
        setArr((prevArr) => {
            const newArr = [...prevArr];

            Array.from({ length: prevArr.length * 3 }).forEach(() => {
                const firstIndex = inRange(0, newArr.length - 1);
                const tmp = newArr[firstIndex]!;
                const secondIndex = inRange(0, newArr.length - 1);
                newArr[firstIndex] = newArr[secondIndex]!;
                newArr[secondIndex] = tmp;
            });

            return newArr;
        });
    });

    const remove = useFunction((index: number) => {
        setArr((prev) => prev.filter((_, i) => i !== index));
    });

    const reset = useFunction(() => {
        setArr([...defaultArr]);
    });

    return (
        <Screen className='flex flex-col'>
            <Scrollable className='flex flex-col gap-2'>
                <button onClick={reset}>
                    <>reset arr</>
                </button>

                <div
                    className='flex flex-col gap-2'
                    ref={wrapperRef}
                >
                    <Iterate items={arr}>
                        {(item, index) => (
                            <Item
                                key={item}
                                item={item}
                                index={index}
                                isFocused={getIsFocused(item)}
                                remove={remove}
                                setFocusId={setCurrentFocusedId}
                                shuffle={shuffle}
                                tabIndex={getTabIndex(item)}
                            />
                        )}
                    </Iterate>
                </div>
            </Scrollable>
        </Screen>
    );
};