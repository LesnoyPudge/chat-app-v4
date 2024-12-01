import {
    createContextSelectable,
    useRefManager,
} from '@lesnoypudge/utils-react';
import { Ref } from 'react';



export type OverlayContext = {
    blocking: boolean;
    focused: boolean;
    isOverlayExist: boolean;
    closingThrottleRef: Ref<boolean>;
    wrapperRefManager: useRefManager.RefManager<HTMLDivElement>;
    openOverlay: () => void;
    closeOverlay: () => void;
    toggleOverlay: () => void;
};

export const OverlayContext = createContextSelectable<OverlayContext>();