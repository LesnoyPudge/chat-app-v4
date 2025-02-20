import { useEventListener, useRefManager } from '_@lesnoypudge/utils-react';
import { isHtmlElement } from '@lesnoypudge/utils-web';
import { useState } from 'react';
import {
    focusTriggersKeyboardModality,
    init,
    isValidFocusTarget,
    state,
} from './setup';
import { invariant, noop } from '@lesnoypudge/utils';
import { mutate } from '@utils';



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

    const getShouldUpdateState = (e: FocusEvent) => {
        const observable = elementRef.current;
        invariant(observable);

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

        return isRelatedNull || (isDifferent && notContains);
    };

    const updateState = (newState: boolean) => {
        if (isFocusedRef.current === newState) return;

        withStateUpdate && setIsFocused(newState);
        mutate(isFocusedRef, 'current', newState);
    };

    useEventListener(
        elementRef,
        inEvent,
        (e) => {
            if (!elementRef.current) return;
            if (!e.target) return;
            if (!isValidFocusTarget(e.target)) return;
            if (
                visible
                && !state.hadKeyboardEvent
                && !focusTriggersKeyboardModality(e.target)
            ) return;

            const shouldUpdate = getShouldUpdateState(e);
            shouldUpdate && updateState(true);

            onFocus(e);
        },
    );

    useEventListener(
        elementRef,
        outEvent,
        (e) => {
            if (!elementRef.current) return;
            if (!e.target) return;
            if (!isValidFocusTarget(e.target)) return;
            if (visible && !isFocusedRef.current) return;

            // To detect a tab/window switch, we look for a blur
            // event followed rapidly by a visibility change.
            // If we don't see a visibility change within 100ms,
            // it's probably a regular focus change.
            state.hadFocusVisibleRecently = true;

            clearTimeout(state.hadFocusVisibleRecentlyTimeout);

            state.hadFocusVisibleRecentlyTimeout = setTimeout(() => {
                state.hadFocusVisibleRecently = false;
            }, 100);

            const shouldUpdate = getShouldUpdateState(e);
            shouldUpdate && updateState(false);

            onBlur(e);
        },
    );

    return {
        isFocused,
        isFocusedRef,
    };
};