import { invariant, KEY } from '@lesnoypudge/utils';
import {
    useFunction,
    useIsFocusedWithin,
    useLatest,
    useRefManager,
} from '@lesnoypudge/utils-react';
import { hotKey } from '@lesnoypudge/utils-web';
import { useHotKey } from '@hooks';
import { useCallback, useState } from 'react';
import { T } from '@lesnoypudge/types-utils-base/namespace';



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
}

export const useKeyboardNavigation = (
    wrapperRefManager: useRefManager.RefManager<HTMLElement>,
    providedOptions: useKeyboardNavigation.Options,
) => {
    const optionsRef = useLatest(providedOptions);
    const { isFocusedWithin } = useIsFocusedWithin(wrapperRefManager);

    const getInitialId = useFunction(() => {
        return (
            optionsRef.current.initialFocusedId
            ?? optionsRef.current.list.at(0)
        );
    });

    const [currentFocusedId, setCurrentFocusedId] = useState(() => {
        return getInitialId();
    });

    const getPossibleIndexes = useFunction((currentIndex: number) => {
        const listLength = optionsRef.current.list.length;
        if (listLength === 1) return {
            nextIndex: currentIndex,
            prevIndex: currentIndex,
        };

        const loop = optionsRef.current.loop;

        if (!loop) {
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
    });

    const changeFocus = useFunction((
        moveDirection: useKeyboardNavigation.MoveDirection,
        prevItem: useKeyboardNavigation.onFocusChangeItem | undefined,
        nextItem: useKeyboardNavigation.onFocusChangeItem,
    ) => {
        let bail = false;

        const prevent = () => {
            bail = true;
        };

        optionsRef.current.onFocusChange?.({
            prev: prevItem,
            next: nextItem,
            moveDirection,
            prevent,
        });

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (bail) return;

        setCurrentFocusedId(nextItem.id);
    });

    const move = useFunction((
        moveDirection: useKeyboardNavigation.MoveDirection,
    ) => {
        const list = optionsRef.current.list;
        if (!list.length) return;

        const isForward = moveDirection === 'forward';

        const currentIndex = (
            currentFocusedId
                ? list.indexOf(currentFocusedId)
                : -1
        );

        const isValidId = !!currentFocusedId && (currentIndex !== -1);
        if (!isValidId) {
            const newId = optionsRef.current.initialFocusedId ?? list[0];
            if (!newId) return;

            changeFocus(moveDirection, undefined, {
                id: newId,
                index: list.indexOf(newId),
            });

            return;
        }

        const { nextIndex, prevIndex } = getPossibleIndexes(currentIndex);
        const newIndex = isForward ? nextIndex : prevIndex;
        const newId = list[newIndex];
        invariant(newId);

        changeFocus(moveDirection, {
            id: currentFocusedId,
            index: currentIndex,
        }, {
            id: newId,
            index: newIndex,
        });
    });

    // forward moves ↓→
    useHotKey(
        wrapperRefManager,
        [
            [KEY.ArrowDown],
            [KEY.ArrowRight],
            [KEY.D],
            [KEY.S],
        ],
        () => move('forward'),
        { hotKeyOptions },
    );

    // backward moves ←↑
    useHotKey(
        wrapperRefManager,
        [
            [KEY.ArrowUp],
            [KEY.ArrowLeft],
            [KEY.A],
            [KEY.W],
        ],
        () => move('backward'),
        { hotKeyOptions },
    );

    const getTabIndex = useCallback((id: string) => {
        if (!currentFocusedId) {
            return id === getInitialId() ? 0 : -1;
        }

        return id === currentFocusedId ? 0 : -1;
    }, [currentFocusedId, getInitialId]);

    const getIsFocused = useCallback((id: string) => {
        if (!isFocusedWithin) return false;

        return id === currentFocusedId;
    }, [currentFocusedId, isFocusedWithin]);

    const withFocusSet = useCallback((id: string, cb?: T.AnyFunction) => {
        return () => {
            setCurrentFocusedId(id);
            cb?.();
        };
    }, [setCurrentFocusedId]);

    return {
        currentFocusedId,
        getTabIndex,
        getIsFocused,
        withFocusSet,
    };
};