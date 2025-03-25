import { invariant, KEY, shallowEqual } from '@lesnoypudge/utils';
import { hotKey } from '@lesnoypudge/utils-web';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
    usePrevious,
    useFunction,
    useMemoShallow,
    useHotKey,
    useIsFocused,
} from '@lesnoypudge/utils-react';
import { Types } from '../../types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useEvent } from '@/hooks';



const hotKeyOptions: hotKey.HotKeyOptions = {
    prevent: true,
    stop: true,
};

// forward vertical moves ↓
const forwardVerticalKeys: hotKey.KeyCombo[] = [
    [KEY.ArrowDown],
    [KEY.S],
];

// backward vertical moves ↑
const backwardVerticalKeys: hotKey.KeyCombo[] = [
    [KEY.ArrowUp],
    [KEY.W],
];

// forward horizontal moves →
const forwardHorizontalKeys: hotKey.KeyCombo[] = [
    [KEY.ArrowRight],
    [KEY.D],
];

// backward horizontal moves ←
const backwardHorizontalKeys: hotKey.KeyCombo[] = [
    [KEY.ArrowLeft],
    [KEY.A],
];

export const useKeyboardNavigationControls: Types.useControls.Fn = ({
    list,
    wrapperRef,
    direction = 'vertical',
    initialFocusedId,
    loop = false,
    onFocusChange,
}) => {
    const isHorizontal = direction === 'horizontal';
    const isVertical = direction === 'vertical';

    const memoizedList = useMemoShallow(list);
    const prevList = usePrevious(memoizedList);
    const initializedFocusedIdRef = useRef<string>();
    const shouldUseMovedOnIdRef = useRef(true);

    const { isFocused } = useIsFocused(
        wrapperRef,
        { within: true, visible: true },
    );

    const getInitialId = useCallback(() => {
        return initialFocusedId ?? memoizedList.at(0);
    }, [initialFocusedId, memoizedList]);

    const [
        lastMovedOnId,
        setLastMovedOnId,
    ] = useState(() => getInitialId());

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

    const derivedCurrentFocusedId = useMemo(() => {
        const isListChanged = !shallowEqual(
            memoizedList,
            prevList,
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
    }, [lastMovedOnId, memoizedList, prevList, getDerivedId]);


    const { on, off, trigger } = useEvent<[Types.ListenerProps]>();

    const focusChangeListener = useFunction((props: Types.ListenerProps) => {
        onFocusChange?.(props);
        trigger(props);
    });

    const changeFocus = ({
        isFromEvent,
        moveDirection,
        next,
        prev,
    }: T.Except<Types.ListenerProps, 'moveEventState'>) => {
        const state: Types.MoveEventState = {
            isPrevented: false,
            prevent: () => {
                state.isPrevented = true;
            },
        };

        focusChangeListener({
            isFromEvent,
            moveDirection,
            next,
            prev,
            moveEventState: state,
        });

        if (state.isPrevented) return;

        setCurrentFocusedId(next.id);
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

    const move = ({
        isFromEvent,
        moveDirection,
    }: Pick<Types.ListenerProps, 'moveDirection' | 'isFromEvent'>) => {
        if (!list.length) return;

        const isForward = moveDirection === 'forward';
        const currentIndex = (
            derivedCurrentFocusedId === undefined
                ? -1
                : list.indexOf(derivedCurrentFocusedId)
        );
        console.log(derivedCurrentFocusedId, currentIndex, memoizedList);
        const isValidId = (
            derivedCurrentFocusedId !== undefined
            && (currentIndex !== -1)
        );
        if (!isValidId) {
            const newId = getInitialId();
            if (!newId) return;

            changeFocus({
                isFromEvent,
                moveDirection,
                prev: undefined,
                next: {
                    id: newId,
                    index: list.indexOf(newId),
                },
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

        changeFocus({
            isFromEvent,
            moveDirection,
            next: {
                id: newId,
                index: newIndex,
            },
            prev: prevItem,
        });
    };

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

    useHotKey(
        wrapperRef,
        forwardVerticalKeys,
        () => isVertical && move({
            isFromEvent: true,
            moveDirection: 'forward',
        }),
        { hotKeyOptions },
    );

    useHotKey(
        wrapperRef,
        backwardVerticalKeys,
        () => isVertical && move({
            isFromEvent: true,
            moveDirection: 'backward',
        }),
        { hotKeyOptions },
    );

    useHotKey(
        wrapperRef,
        forwardHorizontalKeys,
        () => isHorizontal && move({
            isFromEvent: true,
            moveDirection: 'forward',
        }),
        { hotKeyOptions },
    );

    useHotKey(
        wrapperRef,
        backwardHorizontalKeys,
        () => isHorizontal && move({
            isFromEvent: true,
            moveDirection: 'backward',
        }),
        { hotKeyOptions },
    );

    return {
        currentFocusedId: derivedCurrentFocusedId,
        getIsFocused,
        getTabIndex,
        off,
        on,
        setCurrentFocusedId,
    };
};