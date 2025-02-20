import { useEventListener, useRefManager } from '_@lesnoypudge/utils-react';
import { isHtmlElement } from '@lesnoypudge/utils-web';
import { useState } from 'react';
// import {
//     focusTriggersKeyboardModality,
//     init,
//     isValidFocusTarget,
//     state,
// } from './setup';
import { never, noop } from '@lesnoypudge/utils';
import { mutate } from '@utils';


let isInit = false;
let hadKeyboardEvent = true;
let hadFocusVisibleRecently = false;
let hadFocusVisibleRecentlyTimeout: ReturnType<typeof setTimeout>;

const inputTypesAllowlist = {
    'text': true,
    'search': true,
    'url': true,
    'tel': true,
    'email': true,
    'password': true,
    'number': true,
    'date': true,
    'month': true,
    'week': true,
    'time': true,
    'datetime': true,
    'datetime-local': true,
};

/**
 * Helper function for legacy browsers and iframes which sometimes focus
 * elements like document, body, and non-interactive SVG.
 */
const isValidFocusTarget = (el: any) => {
    if (
        el
        && el !== document
        && el.nodeName !== 'HTML'
        && el.nodeName !== 'BODY'
        && 'classList' in el
        && 'contains' in el.classList
    ) return true;

    return false;
};

/**
 * Computes whether the given element should automatically trigger the
 * `focus-visible` class being added, i.e. whether it should always match
 * `:focus-visible` when focused.
 */
const focusTriggersKeyboardModality = (el: any): boolean => {
    const type = el.type as keyof typeof inputTypesAllowlist;
    const tagName = el.tagName;

    if (tagName === 'INPUT' && inputTypesAllowlist[type] && !el.readOnly) {
        return true;
    }

    if (tagName === 'TEXTAREA' && !el.readOnly) {
        return true;
    }

    if (el.isContentEditable) {
        return true;
    }

    return false;
};

/**
 * If the most recent user interaction was via the keyboard;
 * and the key press did not include a meta, alt/option, or control key;
 * then the modality is keyboard. Otherwise, the modality is not keyboard.
 * Apply `focus-visible` to any current active element and keep track
 * of our keyboard modality state with `hadKeyboardEvent`.
 */
const onKeyDown = (e: KeyboardEvent) => {
    if (e.metaKey || e.altKey || e.ctrlKey) return;

    hadKeyboardEvent = true;
};

/**
 * If at any point a user clicks with a pointing device, ensure that we change
 * the modality away from keyboard.
 * This avoids the situation where a user presses a key on an already focused
 * element, and then clicks on a different element, focusing it with a
 * pointing device, while we still think we're in keyboard modality.
 */
const onPointerDown = () => {
    hadKeyboardEvent = false;
};

const init = () => {
    if (isInit) return;
    isInit = true;

    /**
     * If the user changes tabs, keep track of whether or not the previously
     * focused element had .focus-visible.
     */
    const onVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
        // If the tab becomes active again, the browser will handle calling focus
        // on the element (Safari actually calls it twice).
        // If this tab change caused a blur on an element with focus-visible,
        // re-apply the class when the user switches back to the tab.
            if (hadFocusVisibleRecently) {
                hadKeyboardEvent = true;
            }
            addInitialPointerMoveListeners();
        }
    };

    /**
     * Add a group of listeners to detect usage of any pointing devices.
     * These listeners will be added when the polyfill first loads, and anytime
     * the window is blurred, so that they are active when the window regains
     * focus.
     */
    const addInitialPointerMoveListeners = () => {
        document.addEventListener('mousemove', onInitialPointerMove);
        document.addEventListener('mousedown', onInitialPointerMove);
        document.addEventListener('mouseup', onInitialPointerMove);
        document.addEventListener('pointermove', onInitialPointerMove);
        document.addEventListener('pointerdown', onInitialPointerMove);
        document.addEventListener('pointerup', onInitialPointerMove);
        document.addEventListener('touchmove', onInitialPointerMove);
        document.addEventListener('touchstart', onInitialPointerMove);
        document.addEventListener('touchend', onInitialPointerMove);
    };

    const removeInitialPointerMoveListeners = () => {
        document.removeEventListener('mousemove', onInitialPointerMove);
        document.removeEventListener('mousedown', onInitialPointerMove);
        document.removeEventListener('mouseup', onInitialPointerMove);
        document.removeEventListener('pointermove', onInitialPointerMove);
        document.removeEventListener('pointerdown', onInitialPointerMove);
        document.removeEventListener('pointerup', onInitialPointerMove);
        document.removeEventListener('touchmove', onInitialPointerMove);
        document.removeEventListener('touchstart', onInitialPointerMove);
        document.removeEventListener('touchend', onInitialPointerMove);
    };

    /**
     * When the polyfill first loads, assume the user is in keyboard modality.
     * If any event is received from a pointing device (e.g. mouse, pointer,
     * touch), turn off keyboard modality.
     * This accounts for situations where focus enters the page from the URL bar.
     */
    const onInitialPointerMove = (e: Event) => {
    // Work around a Safari quirk that fires a mousemove on <html> whenever the
    // window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
        if (!e.target) return;
        if (!('nodeName' in e.target)) return;
        if (typeof e.target.nodeName !== 'string') return;
        if (
            e.target.nodeName
            && e.target.nodeName.toLowerCase() === 'html'
        ) return;

        hadKeyboardEvent = false;
        removeInitialPointerMoveListeners();
    };

    // For some kinds of state, we are interested in changes at the global scope
    // only. For example, global pointer input, global key presses and global
    // visibility change should affect the state at every scope:
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('mousedown', onPointerDown, true);
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('touchstart', onPointerDown, true);
    document.addEventListener('visibilitychange', onVisibilityChange, true);

    addInitialPointerMoveListeners();
};


// type FnProps = {
//     from: HTMLElement;
//     to: HTMLElement;
//     observable: HTMLElement;
// };

// const getIsNextElementSameOrContainPrevious = ({
//     from,
//     observable,
//     to,
// }: FnProps) => {
//     console.log({ from, to, observable });

//     const shouldUpdateState = (
//         wrapper
//         && (
//             (
//                 isHtmlElement(relatedTarget)
//                 && !wrapper.contains(relatedTarget)
//             )
//             || relatedTarget === null
//         )
//     );

//     return shouldUpdateState;
// };

// const getShouldUpdateStateg = ({
//     from,
//     observable,
//     to,
// }: FnProps) => {
//     console.log({ from, to, observable });

//     const shouldUpdateState = (
//         wrapper
//         && (
//             (
//                 isHtmlElement(relatedTarget)
//                 && !wrapper.contains(relatedTarget)
//             )
//             || relatedTarget === null
//         )
//     );

//     return shouldUpdateState;
// };

export namespace useIsFocused {
    export type Options = {
        /**
         * Tracks if element has focused children.
         * @default false
         */
        within?: boolean;
        /**
         * Tracks if focus is visible to user.
         * @default false
         */
        visible?: boolean;
        /**
         * Disable state updates. Ref will keep updating.
         * @default false
         */
        stateless?: boolean;
        /**
         * Triggered when element receive focus.
         */
        onFocus?: (e: FocusEvent) => void;
        /**
         * Triggered when element lose focus.
         */
        onBlur?: (e: FocusEvent) => void;
    };

    export type Return = {
        isFocused: boolean;
        isFocusedRef: useRefManager.RefManager<boolean>;
    };
}

// react version of
// https://github.com/WICG/focus-visible/blob/main/src/focus-visible.js
export const useIsFocused = (
    elementRef: useRefManager.NullableRefManager<HTMLElement>,
    options?: useIsFocused.Options,
): useIsFocused.Return => {
    const {
        within = false,
        stateless = false,
        visible = false,
        onBlur = noop,
        onFocus = noop,
    } = options ?? {};

    init();

    const [isFocused, setIsFocused] = useState(false);
    const isFocusedRef = useRefManager(isFocused);

    const inEvent = within ? 'focusin' : 'focus';
    const outEvent = within ? 'focusout' : 'blur';
    const withStateUpdate = !stateless;

    const eventTypeToFlag = {
        focusVisibleWithin: visible && within,
        focusBase: !visible && !within,
        focusVisible: visible && !within,
        focusWithin: !visible && within,
    };

    const getShouldUpdateState = (
        observable: HTMLElement,
        e: FocusEvent,
    ) => {
        const relatedTarget = e.relatedTarget;
        const isRelatedNull = relatedTarget === null;
        const isDifferent = observable !== relatedTarget;

        if (!within) {
            return isRelatedNull || isDifferent;
        }

        const notContains = (
            isHtmlElement(relatedTarget)
            && !observable.contains(relatedTarget)
        );
        console.log({ isRelatedNull, notContains });
        return isRelatedNull || (isDifferent && notContains);
    };

    const getShouldUpdateStateIn = (
        observable: HTMLElement,
        e: FocusEvent,
    ): boolean => {
        if (eventTypeToFlag.focusBase) return true;

        const relatedTarget = e.relatedTarget;
        const isFromNull = relatedTarget === null;

        if (eventTypeToFlag.focusWithin) {
            const isSameOrContain = (
                isHtmlElement(relatedTarget)
                && observable.contains(relatedTarget)
            );
            console.log(relatedTarget);
            return isFromNull || !isSameOrContain;
        }

        if (
            eventTypeToFlag.focusVisible
            || eventTypeToFlag.focusVisibleWithin
        ) {
            const isSameOrContain = (
                isHtmlElement(relatedTarget)
                && observable.contains(relatedTarget)
            );

            return isFromNull || !isSameOrContain;
        }

        return false;
    };

    const getShouldUpdateStateOut = (
        observable: HTMLElement,
        e: FocusEvent,
    ): boolean => {
        if (eventTypeToFlag.focusBase) return true;

        const relatedTarget = e.relatedTarget;
        const isToNull = relatedTarget === null;

        if (eventTypeToFlag.focusWithin) {
            const isSameOrContain = (
                isHtmlElement(relatedTarget)
                && observable.contains(relatedTarget)
            );

            return isToNull || !isSameOrContain;
        }

        if (
            eventTypeToFlag.focusVisible
            || eventTypeToFlag.focusVisibleWithin
        ) {
            const isSameOrContain = (
                isHtmlElement(relatedTarget)
                && observable.contains(relatedTarget)
            );

            return isToNull || !isSameOrContain;
        }

        return true;
    };

    const updateState = (newState: boolean) => {
        if (isFocusedRef.current === newState) return;

        withStateUpdate && setIsFocused(newState);
        mutate(isFocusedRef, 'current', newState);
    };

    const handleFocusIn = (e: FocusEvent) => {
        console.log('try in');
        // if (isFocusedRef.current) return;
        const observable = elementRef.current;
        if (!observable) return;
        if (!e.target) return;
        if (!isValidFocusTarget(e.target)) return;
        if (
            visible
            && !hadKeyboardEvent
            && !focusTriggersKeyboardModality(e.target)
        ) return;

        const shouldUpdate = getShouldUpdateState(observable, e);
        console.log('in', { shouldUpdate });
        shouldUpdate && updateState(true);

        onFocus(e);
    };

    const handleFocusOut = (e: FocusEvent) => {
        console.log('try out');
        // if (!isFocusedRef.current) return;
        const observable = elementRef.current;
        if (!observable) return;
        if (!e.target) return;
        if (!isValidFocusTarget(e.target)) return;

        // To detect a tab/window switch, we look for a blur
        // event followed rapidly by a visibility change.
        // If we don't see a visibility change within 100ms,
        // it's probably a regular focus change.
        hadFocusVisibleRecently = true;

        clearTimeout(hadFocusVisibleRecentlyTimeout);

        hadFocusVisibleRecentlyTimeout = setTimeout(() => {
            hadFocusVisibleRecently = false;
        }, 100);

        const shouldUpdate = getShouldUpdateState(observable, e);
        console.log('out', { shouldUpdate });
        shouldUpdate && updateState(false);

        onBlur(e);
    };

    useEventListener(
        elementRef,
        inEvent,
        handleFocusIn,
    );

    useEventListener(
        elementRef,
        outEvent,
        handleFocusOut,
    );

    // only when options.visible = false
    // useEventListener(
    //     elementRef,
    //     inEvent,
    //     (e) => {
    //         if (visible) return;

    //         if (!within || getShouldUpdateState(e)) {
    //             withStateUpdate && setIsFocused(true);
    //             isFocusedRef.current = true;
    //         }

    //         onFocus(e);
    //     },
    // );

    // only when options.visible = false
    // useEventListener(
    //     elementRef,
    //     outEvent,
    //     (e) => {
    //         if (visible) return;
    //         if (!elementRef.current) return;

    //         if (!within || getShouldUpdateState(e)) {
    //             withStateUpdate && setIsFocused(false);
    //             isFocusedRef.current = false;
    //         }

    //         onBlur(e);
    //     },
    // );

    // only when options.visible = true
    // useEventListener(elementRef, inEvent, (e) => {
    //     if (!visible) return;
    //     if (!e.target) return;
    //     if (!isValidFocusTarget(e.target)) return;
    //     if (
    //         !state.hadKeyboardEvent
    //         && !focusTriggersKeyboardModality(e.target)
    //     ) return;

    //     if (getShouldUpdateState(e)) {
    //         withStateUpdate && setIsFocused(true);
    //         isFocusedRef.current = true;
    //     }

    //     onFocus(e);
    // });

    // only when options.visible = true
    // useEventListener(elementRef, outEvent, (e) => {
    //     if (!visible) return;
    //     if (!e.target) return;
    //     if (!isValidFocusTarget(e.target)) return;

    //     // To detect a tab/window switch, we look for a blur event followed
    //     // rapidly by a visibility change.
    //     // If we don't see a visibility change within 100ms, it's probably a
    //     // regular focus change.
    //     state.hadFocusVisibleRecently = true;

    //     clearTimeout(state.hadFocusVisibleRecentlyTimeout);

    //     state.hadFocusVisibleRecentlyTimeout = setTimeout(() => {
    //         state.hadFocusVisibleRecently = false;
    //     }, 100);

    //     if (getShouldUpdateState(e)) {
    //         withStateUpdate && setIsFocused(false);
    //         isFocusedRef.current = false;
    //     }

    //     onBlur(e);
    // });

    return {
        isFocused,
        isFocusedRef,
    };
};