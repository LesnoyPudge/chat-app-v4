import { invariant, KEY, shallowEqual } from '@lesnoypudge/utils';
import { hotKey } from '@lesnoypudge/utils-web';
import { useHotKey, useIsFocusVisible, usePropsChange } from '@hooks';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
    usePrevious,
    useFunction,
    useRefManager,
} from '_@lesnoypudge/utils-react';
import { useMemoShallow } from '@lesnoypudge/utils-react';


const hotKeyOptions: hotKey.HotKeyOptions = {
    prevent: true,
    stop: true,
};

export namespace useKeyboardNavigation {
    export type Direction = 'vertical' | 'horizontal';

    export type MoveDirection = 'forward' | 'backward';

    export type onFocusChangeItem = {
        id: string;
        index: number;
    };

    export type Options = {
        list: string[];
        direction: Direction;
        loop: boolean;
        initialFocusedId?: string;
        onFocusChange?: (value: {
            prev?: onFocusChangeItem;
            next: onFocusChangeItem;
            moveDirection: MoveDirection;
            prevent: () => void;
        }) => void;
    };

    export type Return = {
        currentFocusedId: string | undefined;
        getTabIndex: (id: string) => 0 | -1;
        getIsFocused: (id: string) => boolean;
        // setCurrentFocusedId: Dispatch<SetStateAction<string | undefined>>;
        setCurrentFocusedId: (newId: string) => void;
    };
}

export const useKeyboardNavigation = (
    wrapperRefManager: useRefManager.RefManager<HTMLElement>,
    options: useKeyboardNavigation.Options,
): useKeyboardNavigation.Return => {
    const {
        direction,
        list,
        loop,
        initialFocusedId,
        onFocusChange,
    } = options;

    const memoizedList = useMemoShallow(list);
    const prevListRef = usePrevious(memoizedList);

    usePropsChange({ memoizedList, prevListRef });
    const { isFocused } = useIsFocusVisible(
        wrapperRefManager,
        { within: true },
    );

    const getInitialId = useCallback(() => {
        return initialFocusedId ?? memoizedList.at(0);
    }, [initialFocusedId, memoizedList]);

    const [
        lastMovedOnId,
        setLastMovedOnId,
    ] = useState(() => getInitialId());
    const shouldUseMovedOnIdRef = useRef(true);

    const setCurrentFocusedId = useFunction((newId: string) => {
        shouldUseMovedOnIdRef.current = true;
        setLastMovedOnId(newId);
    });

    const getDerivedId = useFunction((
        lastFocusedId: string | undefined,
    ): string | undefined => {
        const isListEmpty = memoizedList.length === 0;
        if (isListEmpty) return;
        // list not empty

        const isIdDefined = lastFocusedId !== undefined;
        if (!isIdDefined) return getInitialId();
        // list not empty and id is defined

        const isValidId = memoizedList.includes(lastFocusedId);
        if (isValidId) return lastFocusedId;
        // list not empty but id is invalid

        const prevList = prevListRef.current;
        const isPrevListEmpty = (
            prevList === undefined
            || prevList.length === 0
        );
        if (isPrevListEmpty) return getInitialId();
        // list not empty, id is invalid and prev list is not empty

        const currentIdIndex = prevList.indexOf(lastFocusedId);
        const isCurrentIdIndexInvalid = currentIdIndex === -1;
        if (isCurrentIdIndexInvalid) return getInitialId();
        // list not empty, id is invalid and prev list is not empty
        // prev list contains current id;

        const newIndex = Math.min(
            memoizedList.length - 1,
            currentIdIndex,
        );

        const newId = memoizedList[newIndex];
        invariant(newId);

        return newId;
    });

    const initializedFocusedIdRef = useRef<string>();

    const derivedCurrentFocusedId = useMemo(() => {
        const isListChanged = !shallowEqual(
            memoizedList,
            prevListRef.current,
        );
        const shouldRecalculate = (
            isListChanged || shouldUseMovedOnIdRef.current
        );
        if (!shouldRecalculate) return initializedFocusedIdRef.current;

        const lastFocusedId = (
            shouldUseMovedOnIdRef.current
                ? lastMovedOnId
                : initializedFocusedIdRef.current
        );

        if (shouldUseMovedOnIdRef.current) {
            shouldUseMovedOnIdRef.current = false;
        }

        const newId = getDerivedId(lastFocusedId);
        initializedFocusedIdRef.current = newId;

        return newId;
    }, [lastMovedOnId, memoizedList, prevListRef, getDerivedId]);

    const changeFocus = (
        moveDirection: useKeyboardNavigation.MoveDirection,
        prevItem: useKeyboardNavigation.onFocusChangeItem | undefined,
        nextItem: useKeyboardNavigation.onFocusChangeItem,
    ) => {
        let bail = false;

        const prevent = () => {
            bail = true;
        };

        onFocusChange?.({
            prev: prevItem,
            next: nextItem,
            moveDirection,
            prevent,
        });

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (bail) return;

        setCurrentFocusedId(nextItem.id);
    };

    const getPossibleIndexes = (
        currentIndex: number,
        isLoop: boolean,
    ) => {
        const listLength = list.length;
        invariant(listLength !== 0);

        if (listLength === 1) return {
            nextIndex: currentIndex,
            prevIndex: currentIndex,
        };

        if (!isLoop) {
            const nextIndex = Math.min(listLength - 1, currentIndex + 1);
            const prevIndex = Math.max(0, currentIndex - 1);

            return {
                nextIndex,
                prevIndex,
            };
        }

        const nextIndex = (
            currentIndex === listLength - 1
                ? 0
                : currentIndex + 1
        );
        const prevIndex = (
            currentIndex === 0
                ? listLength - 1
                : currentIndex - 1
        );

        return {
            nextIndex,
            prevIndex,
        };
    };

    const move = (
        moveDirection: useKeyboardNavigation.MoveDirection,
    ) => {
        if (!list.length) return;

        const isForward = moveDirection === 'forward';
        const currentIndex = (
            derivedCurrentFocusedId === undefined
                ? -1
                : list.indexOf(derivedCurrentFocusedId)
        );

        const isValidId = (
            derivedCurrentFocusedId !== undefined
            && (currentIndex !== -1)
        );
        if (!isValidId) {
            const newId = getInitialId();
            if (!newId) return;

            changeFocus(moveDirection, undefined, {
                id: newId,
                index: list.indexOf(newId),
            });

            return;
        }

        const { nextIndex, prevIndex } = getPossibleIndexes(
            currentIndex,
            loop,
        );
        const newIndex = isForward ? nextIndex : prevIndex;
        const newId = list[newIndex];
        invariant(newId);

        const prevItem = (
            derivedCurrentFocusedId
                ? ({
                        id: derivedCurrentFocusedId,
                        index: currentIndex,
                    })
                : undefined
        );

        changeFocus(moveDirection, prevItem, {
            id: newId,
            index: newIndex,
        });
    };

    const isHorizontal = direction === 'horizontal';
    const isVertical = direction === 'vertical';

    // forward vertical moves ↓
    useHotKey(
        wrapperRefManager,
        [
            [KEY.ArrowDown],
            [KEY.S],
        ],
        () => isVertical && move('forward'),
        { hotKeyOptions },
    );

    // backward vertical moves ↑
    useHotKey(
        wrapperRefManager,
        [
            [KEY.ArrowUp],
            [KEY.W],
        ],
        () => isVertical && move('backward'),
        { hotKeyOptions },
    );

    // forward horizontal moves →
    useHotKey(
        wrapperRefManager,
        [
            [KEY.ArrowRight],
            [KEY.D],
        ],
        () => isHorizontal && move('forward'),
        { hotKeyOptions },
    );

    // backward horizontal moves ←
    useHotKey(
        wrapperRefManager,
        [
            [KEY.ArrowLeft],
            [KEY.A],
        ],
        () => isHorizontal && move('backward'),
        { hotKeyOptions },
    );

    const getTabIndex = useCallback((id: string) => {
        if (derivedCurrentFocusedId === undefined) {
            return id === getInitialId() ? 0 : -1;
        }

        return id === derivedCurrentFocusedId ? 0 : -1;
    }, [derivedCurrentFocusedId, getInitialId]);

    const getIsFocused = useCallback((id: string) => {
        if (!isFocused) return false;

        return id === derivedCurrentFocusedId;
    }, [derivedCurrentFocusedId, isFocused]);

    return {
        currentFocusedId: derivedCurrentFocusedId,
        getTabIndex,
        getIsFocused,
        setCurrentFocusedId,
    };
};



// export const useKeyboardNavigation = (
//     wrapperRefManager: useRefManager.RefManager<HTMLElement>,
//     options: useKeyboardNavigation.Options,
// ): useKeyboardNavigation.Return => {
//     const {
//         direction,
//         list,
//         loop,
//         initialFocusedId,
//         onFocusChange,
//     } = options;

//     const memoizedList = useMemoShallow(list);
//     const prevListRef = usePrevious(memoizedList);
//     // console.table({
//     //     memoizedList: JSON.stringify(memoizedList),
//     //     list: JSON.stringify(list),
//     //     prevListRef: JSON.stringify(prevListRef.current),
//     // });


//     const [state, setState] = useState({ val: 0 });
//     const memoState = useMemo(() => {
//         return {
//             val: state.val + 0.1,
//         };
//     }, [state]);
//     const inc = () => setState((prev) => ({ val: prev.val + 1 }));

//     console.log(`state is: ${
//         JSON.stringify(state)
//     } ${
//         JSON.stringify(memoState)
//     }`);

//     useEffect(() => {
//         console.log(`Effect state is: ${
//             JSON.stringify(state)
//         } ${
//             JSON.stringify(memoState)
//         }`);
//     });

//     useInterval(inc, 3_000);

//     // const memoizedList = useMemo(() => {
//     //     console.log('1');
//     //     return list;
//     // }, [list]);
//     // console.log('2');

//     const { isFocused } = useIsFocusVisible(
//         wrapperRefManager,
//         { within: true },
//     );

//     const getInitialId = useCallback(() => {
//         return initialFocusedId ?? memoizedList.at(0);
//     }, [initialFocusedId, memoizedList]);

//     const [
//         lastMovedOnId,
//         setLastMovedOnId,
//     ] = useState(() => getInitialId());
//     const shouldUseMovedOnIdRef = useRef(true);

//     const setCurrentFocusedId = useFunction((newId: string) => {
//         console.log(`set focus to ${newId}`);
//         shouldUseMovedOnIdRef.current = true;
//         setLastMovedOnId(newId);
//     });

//     const getDerivedId = useFunction((
//         lastFocusedId: string | undefined,
//     ): string | undefined => {
//         const isListEmpty = memoizedList.length === 0;
//         if (isListEmpty) return;
//         // list not empty

//         const isIdDefined = lastFocusedId !== undefined;
//         if (!isIdDefined) return getInitialId();
//         // list not empty and id is defined

//         const isValidId = memoizedList.includes(lastFocusedId);
//         if (isValidId) return lastFocusedId;
//         // list not empty but id is invalid

//         const prevList = prevListRef.current;
//         const isPrevListEmpty = (
//             prevList === undefined
//             || prevList.length === 0
//         );
//         if (isPrevListEmpty) return getInitialId();
//         // list not empty, id is invalid and prev list is not empty

//         const currentIdIndex = prevList.indexOf(lastFocusedId);
//         const isCurrentIdIndexInvalid = currentIdIndex === -1;
//         if (isCurrentIdIndexInvalid) return getInitialId();
//         // list not empty, id is invalid and prev list is not empty
//         // prev list contains current id;

//         const newIndex = Math.min(
//             memoizedList.length - 1,
//             currentIdIndex,
//         );

//         const newId = memoizedList[newIndex];
//         invariant(newId);

//         return newId;
//     });

//     const initializedFocusedIdRef = useRef<string>();

//     const derivedCurrentFocusedId = useMemo(() => {
//         const isListChanged = !shallowEqual(
//             memoizedList,
//             prevListRef.current,
//         );
//         const shouldRecalculate = (
//             isListChanged || shouldUseMovedOnIdRef.current
//         );
//         if (!shouldRecalculate) return initializedFocusedIdRef.current;

//         const lastFocusedId = (
//             shouldUseMovedOnIdRef.current
//                 ? lastMovedOnId
//                 : initializedFocusedIdRef.current
//         );

//         if (shouldUseMovedOnIdRef.current) {
//             shouldUseMovedOnIdRef.current = false;
//         }

//         const newId = getDerivedId(lastFocusedId);
//         initializedFocusedIdRef.current = newId;

//         return newId;
//     }, [lastMovedOnId, memoizedList, prevListRef, getDerivedId]);

//     const changeFocus = (
//         moveDirection: useKeyboardNavigation.MoveDirection,
//         prevItem: useKeyboardNavigation.onFocusChangeItem | undefined,
//         nextItem: useKeyboardNavigation.onFocusChangeItem,
//     ) => {
//         let bail = false;

//         const prevent = () => {
//             bail = true;
//         };

//         onFocusChange?.({
//             prev: prevItem,
//             next: nextItem,
//             moveDirection,
//             prevent,
//         });

//         // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
//         if (bail) return;

//         setCurrentFocusedId(nextItem.id);
//     };

//     const getPossibleIndexes = (
//         currentIndex: number,
//         isLoop: boolean,
//     ) => {
//         const listLength = list.length;
//         invariant(listLength !== 0);

//         if (listLength === 1) return {
//             nextIndex: currentIndex,
//             prevIndex: currentIndex,
//         };

//         if (!isLoop) {
//             const nextIndex = Math.min(listLength - 1, currentIndex + 1);
//             const prevIndex = Math.max(0, currentIndex - 1);

//             return {
//                 nextIndex,
//                 prevIndex,
//             };
//         }

//         const nextIndex = (
//             currentIndex === listLength - 1
//                 ? 0
//                 : currentIndex + 1
//         );
//         const prevIndex = (
//             currentIndex === 0
//                 ? listLength - 1
//                 : currentIndex - 1
//         );

//         return {
//             nextIndex,
//             prevIndex,
//         };
//     };

//     const move = (
//         moveDirection: useKeyboardNavigation.MoveDirection,
//     ) => {
//         if (!list.length) return;

//         const isForward = moveDirection === 'forward';
//         const currentIndex = (
//             derivedCurrentFocusedId === undefined
//                 ? -1
//                 : list.indexOf(derivedCurrentFocusedId)
//         );

//         const isValidId = (
//             derivedCurrentFocusedId !== undefined
//             && (currentIndex !== -1)
//         );
//         if (!isValidId) {
//             const newId = getInitialId();
//             if (!newId) return;

//             changeFocus(moveDirection, undefined, {
//                 id: newId,
//                 index: list.indexOf(newId),
//             });

//             return;
//         }

//         const { nextIndex, prevIndex } = getPossibleIndexes(
//             currentIndex,
//             loop,
//         );
//         const newIndex = isForward ? nextIndex : prevIndex;
//         const newId = list[newIndex];
//         invariant(newId);

//         const prevItem = (
//             derivedCurrentFocusedId
//                 ? ({
//                         id: derivedCurrentFocusedId,
//                         index: currentIndex,
//                     })
//                 : undefined
//         );

//         changeFocus(moveDirection, prevItem, {
//             id: newId,
//             index: newIndex,
//         });
//     };

//     const isHorizontal = direction === 'horizontal';
//     const isVertical = direction === 'vertical';

//     // forward vertical moves ↓
//     useHotKey(
//         wrapperRefManager,
//         [
//             [KEY.ArrowDown],
//             [KEY.S],
//         ],
//         () => isVertical && move('forward'),
//         { hotKeyOptions },
//     );

//     // backward vertical moves ↑
//     useHotKey(
//         wrapperRefManager,
//         [
//             [KEY.ArrowUp],
//             [KEY.W],
//         ],
//         () => isVertical && move('backward'),
//         { hotKeyOptions },
//     );

//     // forward horizontal moves →
//     useHotKey(
//         wrapperRefManager,
//         [
//             [KEY.ArrowRight],
//             [KEY.D],
//         ],
//         () => isHorizontal && move('forward'),
//         { hotKeyOptions },
//     );

//     // backward horizontal moves ←
//     useHotKey(
//         wrapperRefManager,
//         [
//             [KEY.ArrowLeft],
//             [KEY.A],
//         ],
//         () => isHorizontal && move('backward'),
//         { hotKeyOptions },
//     );

//     const getTabIndex = useCallback((id: string) => {
//         if (derivedCurrentFocusedId === undefined) {
//             return id === getInitialId() ? 0 : -1;
//         }

//         return id === derivedCurrentFocusedId ? 0 : -1;
//     }, [derivedCurrentFocusedId, getInitialId]);

//     const getIsFocused = useCallback((id: string) => {
//         if (!isFocused) return false;

//         return id === derivedCurrentFocusedId;
//     }, [derivedCurrentFocusedId, isFocused]);

//     return {
//         currentFocusedId: derivedCurrentFocusedId,
//         getTabIndex,
//         getIsFocused,
//         setCurrentFocusedId,
//     };
// };