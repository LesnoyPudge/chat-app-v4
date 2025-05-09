import { renderFunction, useRefManager } from '@lesnoypudge/utils-react';
import { Types } from '../../types';
import { FC } from 'react';
import { useKeyboardNavigationCommonItem } from '../../hooks';



export const KeyboardNavigationItem: FC<Types.Item.Props> = ({
    itemId,
    children,
}) => {
    const elementRef = useRefManager<HTMLElement>(null);

    const {
        isCurrentId,
        setId,
        tabIndex,
    } = useKeyboardNavigationCommonItem({
        elementRef,
        itemId,
    });

    const itemProps: Types.Item.ChildrenProps = {
        elementRef,
        isCurrentId,
        setId,
        tabIndex,
        itemId,
    };

    return renderFunction(children, itemProps);
};