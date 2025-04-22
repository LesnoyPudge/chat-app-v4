import { useKeyboardNavigationContextSelector } from '../../context';
import { Types } from '../../types';



export const useKeyboardNavigationTabIndex: Types.useTabIndex.Fn = (
    itemId,
) => {
    const tabIndex = useKeyboardNavigationContextSelector((v) => {
        if (v.currentId === undefined) {
            return itemId === v.instance.getInitialId() ? 0 : -1;
        }

        return itemId === v.currentId ? 0 : -1;
    });

    return tabIndex;
};