import { isPlainObject } from '@lesnoypudge/utils';
import { useRelativePosition } from '../useRelativePosition';



export const isOmittedRect = (
    possibleRect: unknown,
): possibleRect is useRelativePosition.OmittedRect => {
    if (!isPlainObject(possibleRect)) return false;

    return (
        'bottom' in possibleRect
        && 'height' in possibleRect
        && 'left' in possibleRect
        && 'right' in possibleRect
        && 'top' in possibleRect
        && 'width' in possibleRect
    );
};