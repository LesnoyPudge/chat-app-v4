import {
    ContextSelectable,
    renderFunction,
    useFunction,
    useRefManager,
} from '@lesnoypudge/utils-react';
import { Types } from '../../types';
import { KeyboardNavigation } from '@/components';



export const TabItem = <
    _Tabs extends Types.GenericTabs,
>({
    context,
    tabName,
    children,
}: Types.Item.Props<_Tabs>) => {
    const elementRef = useRefManager<HTMLButtonElement>(null);

    const changeTab = ContextSelectable.useSelector(
        context, (v) => v.changeTab[tabName],
    );

    const { controls, id, role } = ContextSelectable.useSelector(
        context, (v) => v.tabProps[tabName],
    );

    const isCurrentTab = ContextSelectable.useSelector(
        context, (v) => v.isActive[tabName],
    );

    const {
        isCurrentId,
        setId,
        tabIndex,
    } = KeyboardNavigation.useCommonItem({
        elementRef,
        itemId: tabName,
    });

    const navigateToTab = useFunction(() => {
        setId();
        changeTab();
    });

    const childrenProps: Types.Item.ChildrenProps = {
        controls,
        id,
        innerRef: elementRef,
        isActive: isCurrentId || isCurrentTab,
        onLeftClick: navigateToTab,
        role,
        tabIndex,
    };

    return renderFunction(children, childrenProps);
};