import { ContextSelectable } from '@lesnoypudge/utils-react';
import { TabContextProvider } from '../TabContextProvider';



export namespace CurrentTab {
    export type Props<
        _Tabs extends TabContextProvider.GenericTabs,
    > = Pick<
        TabContextProvider.Props<_Tabs>,
        'context'
    >;
}

export const CurrentTab = <
    _Tabs extends TabContextProvider.GenericTabs,
>({ context }: CurrentTab.Props<_Tabs>) => {
    const { currentTab } = ContextSelectable.useSelector(context, ({ currentTab }) => ({
        currentTab,
    }));

    return currentTab.tab;
};