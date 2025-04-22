import { useFunction } from '@lesnoypudge/utils-react';
import { Types } from '../../types';
import { useKeyboardNavigationContextSelector } from '../../context';



export const useKeyboardNavigationSetId: Types.useSetId.Fn = (
    itemId,
) => {
    const instance = useKeyboardNavigationContextSelector(
        (v) => v.instance,
    );

    const setId = useFunction(() => {
        instance.setId(itemId);
    });

    return setId;
};