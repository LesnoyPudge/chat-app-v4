import { createContextSelectable } from '@lesnoypudge/utils-react';
import { ReactNode } from 'react';
import { TabContextProvider } from '../../components';



export type TabContext<_Tabs extends TabContextProvider.GenericTabs> = {
    tabs: Record<keyof _Tabs, TabContextProvider.Tab<_Tabs>>;
    currentTab: TabContextProvider.Tab<_Tabs>;
    changeTab: Record<keyof _Tabs, () => void>;
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

export const TabContext = createContextSelectable<
    TabContext<Record<string, ReactNode>>
>();