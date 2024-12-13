import {
    useBoolean,
    useFunction,
    useLatest,
    useRefManager,
    useThrottle,
} from '@lesnoypudge/utils-react';
import { FC, PropsWithChildren } from 'react';
import { OverlayContext } from '../../context';



export namespace OverlayProvider {
    export type Props = (
        PropsWithChildren
        & {
            initialState?: boolean;
            disabled?: boolean;
        }
    );
}

export const OverlayProvider: FC<OverlayProvider.Props> = ({
    children,
    initialState = false,
    disabled = false,
}) => {
    const overlayState = useBoolean(initialState);
    const overlayStateValueRef = useLatest(overlayState.value);
    const { isThrottlingRef, throttle } = useThrottle({ stateless: true });
    const wrapperRefManager = useRefManager<HTMLDivElement>(null);

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

    const contextValues: OverlayContext = {
        isOverlayExist: overlayState.value,
        isOverlayExistRef: overlayStateValueRef,
        closingThrottleRef: isThrottlingRef,
        wrapperRefManager,
        setOverlay: overlayState.setValue,
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