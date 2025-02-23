import {
    ContextSelectable,
    useRefManager,
} from '@lesnoypudge/utils-react';
import { MutableRefObject } from 'react';



export type OverlayContext = {
    isOverlayExist: boolean;
    isOverlayExistRef: MutableRefObject<boolean>;
    closingThrottleRef: MutableRefObject<boolean>;
    portalRefManager: useRefManager.NullableRefManager<HTMLDivElement>;
    openOverlay: VoidFunction;
    closeOverlay: VoidFunction;
    toggleOverlay: VoidFunction;
    setOverlay: (value: boolean) => void;
};

export const OverlayContext = ContextSelectable.createContext<OverlayContext>();