import {
    useBoolean,
    useClickOutside,
    useContextProxy,
    useEventListener,
    useFunction,
    useLatest,
    useRefManager,
    useThrottle,
} from '@lesnoypudge/utils-react';
import { FC, PropsWithChildren } from 'react';
import { OverlayContext } from '../../context';
import { KEY } from '@lesnoypudge/utils';



export namespace OverlayProvider {
    export type Props = (
        PropsWithChildren
        & Partial<Pick<OverlayContext, 'blocking' | 'focused'>>
        & {
            initialState?: boolean;
            disabled?: boolean;
            blockable?: boolean;
            blocking?: boolean;
            closeOnEscape?: boolean;
            closeOnClickOutside?: boolean;
        }
    );
}

export const OverlayProvider: FC<OverlayProvider.Props> = ({
    children,
    initialState = false,
    disabled = false,
    blockable = false,
    blocking = false,
    closeOnEscape = false,
    closeOnClickOutside = false,
    focused = false,
}) => {
    const overlayState = useBoolean(initialState);
    const overlayStateValueRef = useLatest(overlayState.value);
    const { isThrottlingRef, throttle } = useThrottle({ stateless: true });
    const upperOverlay = useContextProxy(OverlayContext) as OverlayContext | undefined;
    const wrapperRefManager = useRefManager<HTMLDivElement>(null);

    const isBlocked = upperOverlay?.blocking ?? false;

    const closeOverlay = useFunction(() => {
        if (!overlayStateValueRef.current) return;
        if (disabled) return;

        throttle(overlayState.setFalse, 1_000 / 60)();
    });

    const openOverlay = useFunction(() => {
        if (isThrottlingRef.current) return;
        if (disabled) return;

        overlayState.setTrue();
    });

    const toggleOverlay = useFunction(() => {
        if (isThrottlingRef.current) return;
        if (disabled) return;

        overlayState.toggle();
    });

    useClickOutside(wrapperRefManager, () => {
        if (!overlayState.value) return;
        if (!wrapperRefManager.current) return;
        if (!closeOnClickOutside) return;
        if (!isBlocked) return closeOverlay();
    });

    useEventListener(document, 'keydown', (e) => {
        if (!overlayState.value) return;
        if (!closeOnEscape) return;
        if (!wrapperRefManager.current) return;
        if (!e.target) return;
        if (e.key !== KEY.Escape) return;
        if (!blockable) return closeOverlay();
        if (!isBlocked) return closeOverlay();
    });

    const contextValues: OverlayContext = {
        blocking,
        focused,
        isOverlayExist: overlayState.value,
        closingThrottleRef: isThrottlingRef,
        wrapperRefManager,
        openOverlay,
        closeOverlay,
        toggleOverlay,
    };

    return (
        <OverlayContext.Provider value={contextValues}>
            {children}
        </OverlayContext.Provider>
    );
};