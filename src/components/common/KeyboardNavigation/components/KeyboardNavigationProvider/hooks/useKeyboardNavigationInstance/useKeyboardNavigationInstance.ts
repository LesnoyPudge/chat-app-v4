import { KEY, noop } from '@lesnoypudge/utils';
import { hotKey } from '@lesnoypudge/utils-web';
import { useEffect, useImperativeHandle, useSyncExternalStore } from 'react';
import { useHotKey, useConst } from '@lesnoypudge/utils-react';
import { Types } from '../../../../types';
import { KeyboardNavigationInstance } from '../../../../instance';



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

export const useKeyboardNavigationInstance: Types.useInstance.Fn = ({
    wrapperRef,
    onIdChange = noop,
    direction = 'vertical',
    list,
    loop,
    takeInitialIdFrom,
    apiRef,
}) => {
    const instance = useConst(() => new KeyboardNavigationInstance({
        list,
        loop,
        takeInitialIdFrom,
    }));

    useImperativeHandle(apiRef, () => instance, [instance]);

    const currentId = useSyncExternalStore(
        (trigger) => instance.onIdChange(trigger),
        instance.getId,
    );

    useEffect(() => {
        instance.updateOptions({
            list,
            loop,
            takeInitialIdFrom,
        });
    }, [
        instance,
        list,
        loop,
        takeInitialIdFrom,
    ]);

    useEffect(() => {
        return instance.onIdChange(onIdChange);
    }, [instance, onIdChange]);

    const isVertical = direction === 'vertical';
    const isHorizontal = !isVertical;

    useHotKey(
        wrapperRef,
        forwardVerticalKeys,
        () => isVertical && instance.eventMove({
            moveDirection: 'forward',
        }),
        { hotKeyOptions },
    );

    useHotKey(
        wrapperRef,
        backwardVerticalKeys,
        () => isVertical && instance.eventMove({
            moveDirection: 'backward',
        }),
        { hotKeyOptions },
    );

    useHotKey(
        wrapperRef,
        forwardHorizontalKeys,
        () => isHorizontal && instance.eventMove({
            moveDirection: 'forward',
        }),
        { hotKeyOptions },
    );

    useHotKey(
        wrapperRef,
        backwardHorizontalKeys,
        () => isHorizontal && instance.eventMove({
            moveDirection: 'backward',
        }),
        { hotKeyOptions },
    );

    return {
        currentId,
        instance,
    };
};