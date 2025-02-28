import { ContextSelectable } from '@lesnoypudge/utils-react';
import { TabContextProvider } from '../../components';



export namespace createTabContext {
    export type Context<_Tabs extends TabContextProvider.GenericTabs> = {
        transformedTabs: Record<keyof _Tabs, TabContextProvider.Tab<_Tabs>>;
        currentTab: TabContextProvider.Tab<_Tabs>;
        changeTab: Record<keyof _Tabs, VoidFunction>;
        isActive: Record<keyof _Tabs, boolean>;
        tabProps: Record<
            keyof _Tabs,
            TabContextProvider.TabProps<string>
        >;
        tabPanelProps: Record<
            keyof _Tabs,
            TabContextProvider.TabPanelProps<string>
        >;
    };
}

export const createTabContext = <
    _Tabs extends TabContextProvider.GenericTabs,
>() => ContextSelectable.createContext<createTabContext.Context<_Tabs>>();