import { Types } from '../../types';
import { useKeyboardNavigationContextSelector } from '../../context';



export const useKeyboardNavigationIsCurrentId: Types.useIsCurrentId.Fn = (
    itemId,
) => {
    const isCurrentId = useKeyboardNavigationContextSelector(
        (v) => v.currentId === itemId,
    );

    return isCurrentId;
};