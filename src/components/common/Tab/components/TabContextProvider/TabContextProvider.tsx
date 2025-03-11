import { useConst, useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { useMemo, useState } from 'react';
import { Types } from '../../types';
import { createProps } from '../../utils';



export const TabContextProvider = <
    _Tabs extends Types.GenericTabs,
>({
    context,
    tabs,
    orientation = 'horizontal',
    initialTab,
    onTabChange,
    children,
}: Types.TabContextProvider.Props<_Tabs>) => {
    const {
        tabNames,
        tabPanelProps,
        tabProps,
        tabName,
    } = useConst(() => createProps(tabs));

    const listRef = useRefManager<HTMLDivElement>(null);

    const getCurrentTab = useFunction((
        identifier: keyof _Tabs,
    ): Types.Tab<_Tabs> => ({
        identifier: identifier.toString(),
        tab: tabs[identifier],
    }));

    const [currentTab, setCurrentTab] = useState<
        Types.Tab<_Tabs>
    >(() => getCurrentTab(initialTab));

    const changeTab = useConst(() => {
        return tabNames.reduce<
            Types.Context<_Tabs>['changeTab']
        >((acc, key) => {
            acc[key] = () => {
                if (!onTabChange) return setCurrentTab(getCurrentTab(key));

                let isPrevented = false;

                const prevent = () => {
                    isPrevented = true;
                };

                onTabChange(prevent);

                if (!isPrevented) setCurrentTab(getCurrentTab(key));
            };

            return acc;
        }, {});
    });

    const transformedTabs = useConst(() => {
        return tabNames.reduce<
            Types.Context<_Tabs>['transformedTabs']
        >((acc, key) => {
            acc[key] = {
                identifier: key,
                tab: tabs[key],
            };

            return acc;
        }, {});
    });

    const isActive = useMemo(() => {
        return Object.keys<_Tabs>(tabs).reduce<
            Types.Context<_Tabs>['isActive']
        >((acc, key) => {
            acc[key] = currentTab.identifier === key;

            return acc;
        }, {});
    }, [currentTab.identifier, tabs]);

    const contextValues = {
        initialTabName: initialTab,
        transformedTabs,
        currentTab,
        changeTab,
        isActive,
        tabNames,
        tabName,
        _listRef: listRef,
        orientation,
        tabProps,
        _tabPanelProps: tabPanelProps,
    } satisfies Types.Context<_Tabs>;

    const TabContext = context;

    return (
        <TabContext.Provider value={contextValues}>
            {children}
        </TabContext.Provider>
    );
};