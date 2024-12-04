import { useContextSelector } from '@lesnoypudge/utils-react';
import { TabContextProvider } from '../TabContextProvider';



export namespace CurrentTab {
    export type Props<
        _Tabs extends TabContextProvider.GenericTabs,
    > = Pick<
        TabContextProvider.Props<_Tabs>,
        'TabContext'
    >;
}

export const CurrentTab = <
    _Tabs extends TabContextProvider.GenericTabs,
>({ TabContext }: CurrentTab.Props<_Tabs>) => {
    const currentTab = useContextSelector(TabContext, (v) => v.currentTab);

    return currentTab.tab;
};