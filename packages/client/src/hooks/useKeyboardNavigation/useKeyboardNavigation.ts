import { invariant, KEY, shallowEqual } from '@lesnoypudge/utils';
import { hotKey } from '@lesnoypudge/utils-web';
import { useHotKey, useIsFocusVisible, usePropsChange } from '@hooks';
import { Dispatch, SetStateAction, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
    usePrevious,
    useForceUpdate,
    useIsFirstMount,
    useFunction,
    useLatest,
    useRefManager,
} from '_@lesnoypudge/utils-react';


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

    const prevList = usePrevious(list);
    const { isFocused } = useIsFocusVisible(
        wrapperRefManager,
        { within: true },
    );

    const getInitialId = useCallback(() => {
        return initialFocusedId ?? list.at(0);
    }, [initialFocusedId, list]);

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
        const isListEmpty = list.length === 0;
        if (isListEmpty) return;
        // list not empty

        const isIdDefined = lastFocusedId !== undefined;
        if (!isIdDefined) return getInitialId();
        // list not empty and id is defined

        const isValidId = list.includes(lastFocusedId);
        if (isValidId) return lastFocusedId;
        // list not empty but id is invalid

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
            list.length - 1,
            currentIdIndex,
        );

        const newId = list[newIndex];
        invariant(newId);

        return newId;
    });

    const initializedFocusedIdRef = useRef<string>();

    const derivedCurrentFocusedId: string | undefined = useMemo(() => {
        const isNewList = !shallowEqual(list, prevList);
        const shouldRecalculate = isNewList || shouldUseMovedOnIdRef.current;
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
    }, [lastMovedOnId, list, prevList, getDerivedId]);

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
//     providedOptions: useKeyboardNavigation.Options,
// ): useKeyboardNavigation.Return => {
//     const prevListRef = useRef(providedOptions.list);
//     const optionsRef = useLatest(providedOptions);
//     const { isFocusedRef } = useIsFocusVisible(
//         wrapperRefManager,
//         { within: true, stateless: true },
//     );

//     const getInitialId = useCallback(() => {
//         return (
//             providedOptions.initialFocusedId
//             ?? providedOptions.list.at(0)
//         );
//     }, [providedOptions.initialFocusedId, providedOptions.list]);

//     const [currentFocusedId, setCurrentFocusedId] = useState(() => {
//         return getInitialId();
//     });
//     const currentFocusedIdRef = useLatest(currentFocusedId);

//     const getPossibleIndexes = useFunction((currentIndex: number) => {
//         const listLength = optionsRef.current.list.length;
//         if (listLength === 1) return {
//             nextIndex: currentIndex,
//             prevIndex: currentIndex,
//         };

//         const loop = optionsRef.current.loop;

//         if (!loop) {
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
//     });

//     const changeFocus = useFunction((
//         moveDirection: useKeyboardNavigation.MoveDirection,
//         prevItem: useKeyboardNavigation.onFocusChangeItem | undefined,
//         nextItem: useKeyboardNavigation.onFocusChangeItem,
//     ) => {
//         let bail = false;

//         const prevent = () => {
//             bail = true;
//         };

//         optionsRef.current.onFocusChange?.({
//             prev: prevItem,
//             next: nextItem,
//             moveDirection,
//             prevent,
//         });

//         // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
//         if (bail) return;

//         setCurrentFocusedId(nextItem.id);
//     });

//     const move = useFunction((
//         moveDirection: useKeyboardNavigation.MoveDirection,
//     ) => {
//         const list = optionsRef.current.list;
//         if (!list.length) return;

//         const isForward = moveDirection === 'forward';

//         const currentIndex = (
//             currentFocusedId
//                 ? list.indexOf(currentFocusedId)
//                 : -1
//         );

//         const isValidId = !!currentFocusedId && (currentIndex !== -1);
//         if (!isValidId) {
//             const newId = optionsRef.current.initialFocusedId ?? list[0];
//             if (!newId) return;

//             changeFocus(moveDirection, undefined, {
//                 id: newId,
//                 index: list.indexOf(newId),
//             });

//             return;
//         }

//         const { nextIndex, prevIndex } = getPossibleIndexes(currentIndex);
//         const newIndex = isForward ? nextIndex : prevIndex;
//         const newId = list[newIndex];
//         invariant(newId);

//         changeFocus(moveDirection, {
//             id: currentFocusedId,
//             index: currentIndex,
//         }, {
//             id: newId,
//             index: newIndex,
//         });
//     });

//     // forward moves ↓→
//     useHotKey(
//         wrapperRefManager,
//         [
//             [KEY.ArrowDown],
//             [KEY.ArrowRight],
//             [KEY.D],
//             [KEY.S],
//         ],
//         () => move('forward'),
//         { hotKeyOptions },
//     );

//     // backward moves ←↑
//     useHotKey(
//         wrapperRefManager,
//         [
//             [KEY.ArrowUp],
//             [KEY.ArrowLeft],
//             [KEY.A],
//             [KEY.W],
//         ],
//         () => move('backward'),
//         { hotKeyOptions },
//     );

//     useLayoutEffect(() => {
//         const list = providedOptions.list;
//         const prevList = prevListRef.current;
//         const isSame = shallowEqual(list, prevList);
//         if (isSame) return;

//         console.log(`list changed, prev: ${
//             JSON.stringify(prevListRef.current)
//         }, new: ${JSON.stringify(list)}`);
//         prevListRef.current = list;
//         const currentId = currentFocusedIdRef.current;
//         const isCurrentIdValid = list.includes(currentId);
//         if (isCurrentIdValid) return;
//         console.log(`id ${currentId} is invalid!`);
//         // const prevIdIndex = prevList.indexOf(currentId);
//     }, [providedOptions.list, currentFocusedIdRef]);

//     const getTabIndex = useCallback((id: string) => {
//         if (!currentFocusedId) {
//             return id === getInitialId() ? 0 : -1;
//         }

//         return id === currentFocusedId ? 0 : -1;
//     }, [
//         currentFocusedId,
//         getInitialId,
//     ]);

//     const getIsFocused = useCallback((id: string) => {
//         if (!isFocusedRef.current) return false;

//         return id === currentFocusedId;
//     }, [currentFocusedId, isFocusedRef]);

//     return {
//         currentFocusedId,
//         getTabIndex,
//         getIsFocused,
//         setCurrentFocusedId,
//     };
// };