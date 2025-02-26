import {
    useBoolean,
    useFunction,
    useLatest,
    useRefManager,
    useThrottle,
} from '@lesnoypudge/utils-react';
import { FC, PropsWithChildren } from 'react';
import { BaseOverlayContext } from '../../context';



export namespace BaseOverlayProvider {
    export type Props = (
        PropsWithChildren
        & {
            disabled?: boolean;
            outerState?: boolean;
            initialState?: boolean;
            onChange?: (value: boolean) => void;
        }
    );
}

export const BaseOverlayProvider: FC<BaseOverlayProvider.Props> = ({
    outerState,
    initialState,
    disabled = false,
    onChange,
    children,
}) => {
    const _initialState = outerState ?? initialState ?? false;
    const { value, ...overlay } = useBoolean(_initialState, onChange);

    const isOverlayExist = outerState ?? value;
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

    const contextValues: BaseOverlayContext = {
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
        <BaseOverlayContext.Provider value={contextValues}>
            {children}
        </BaseOverlayContext.Provider>
    );
};