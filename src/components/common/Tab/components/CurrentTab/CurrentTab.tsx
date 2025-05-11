import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export const CurrentTab = <
    _Tabs extends Types.GenericTabs,
>({ context }: Types.Current.Props<_Tabs>) => {
    const currentTab = ContextSelectable.useSelector(
        context,
        (v) => v.currentTab,
    );

    return currentTab.tab;
};