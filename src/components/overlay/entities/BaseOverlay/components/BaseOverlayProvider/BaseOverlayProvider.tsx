import {
    useBoolean,
    useFunction,
    useLatest,
    useRefManager,
    useThrottle,
} from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { Overlay } from '@/components';



export const BaseOverlayProvider: FC<Overlay.BaseOverlay.Types.Provider.Props> = ({
    initialState,
    disabled = false,
    controls,
    children,
}) => {
    const _initialState = controls?.isOpen ?? initialState ?? false;
    const {
        value,
        ...overlay
    } = useBoolean(_initialState, controls?.onChange);

    const isOverlayExist = controls?.isOpen ?? value;
    const isOverlayExistRef = useLatest(isOverlayExist);

    const { isThrottlingRef, throttle } = useThrottle({ stateless: true });
    const portalRefManager = useRefManager<HTMLDivElement>(null);

    const closeOverlay = useFunction(() => {
        if (!isOverlayExistRef.current) return;
        if (disabled) return;

        throttle(overlay.setFalse, 1_000 / 60)();
    });

    const openOverlay = useFunction(() => {
        if (isThrottlingRef.current) return;
        if (disabled) return;

        overlay.setTrue();
    });

    const toggleOverlay = useFunction(() => {
        if (isThrottlingRef.current) return;
        if (disabled) return;

        overlay.toggle();
    });

    const contextValues: Overlay.BaseOverlay.Types.Context = {
        isOverlayExist,
        isOverlayExistRef,
        closingThrottleRef: isThrottlingRef,
        portalRefManager,
        setOverlay: overlay.setValue,
        openOverlay,
        closeOverlay,
        toggleOverlay,
    };

    return (
        <Overlay.BaseOverlay.Context.Provider value={contextValues}>
            {children}
        </Overlay.BaseOverlay.Context.Provider>
    );
};