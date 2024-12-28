import {
    createContextSelectable,
    useRefManager,
} from '@lesnoypudge/utils-react';
import { MutableRefObject } from 'react';



export type OverlayContext = {
    isOverlayExist: boolean;
    isOverlayExistRef: MutableRefObject<boolean>;
    closingThrottleRef: MutableRefObject<boolean>;
    portalRefManager: useRefManager.RefManager<HTMLDivElement>;
    openOverlay: VoidFunction;
    closeOverlay: VoidFunction;
    toggleOverlay: VoidFunction;
    setOverlay: (value: boolean) => void;
};

export const OverlayContext = createContextSelectable<OverlayContext>();