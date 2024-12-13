import { ContextSelectable, useConst, useFunction, useUniqueState } from '@lesnoypudge/utils-react';
import { PropsWithChildren, ReactNode, useMemo } from 'react';
import { createTabContext } from '../../utils';
import { invariant } from '@lesnoypudge/utils';



export namespace TabContextProvider {
    export type GenericTabs = Record<string, ReactNode>;

    export type TabProps<KEY extends keyof GenericTabs> = {
        role: 'tab';
        controls: `tabPanel-${KEY}`;
        id: `tab-${KEY}`;
    };

    export type TabPanelProps<KEY extends keyof GenericTabs> = {
        id: `tabPanel-${KEY}`;
        labelledBy: `tab-${KEY}`;
    };

    export type Tab<VALUES> = {
        identifier: keyof VALUES;
        tab: ReactNode;
    };

    export type Props<_Tabs extends GenericTabs> = (
        PropsWithChildren
        & {
            context: ContextSelectable<createTabContext.Context<_Tabs>>;
            tabs: _Tabs;
            initialTab: keyof _Tabs;
            onTabChange?: (prevent: VoidFunction) => void;
        }
    );
}

export const TabContextProvider = <
    _Tabs extends TabContextProvider.GenericTabs,
>({
    context,
    tabs,
    initialTab,
    onTabChange,
    children,
}: TabContextProvider.Props<_Tabs>) => {
    const tabsArray = useConst(() => Object.keys<_Tabs>(tabs));

    const getCurrentTab = useFunction((
        identifier: keyof _Tabs,
    ): TabContextProvider.Tab<_Tabs> => ({
        identifier: identifier.toString(),
        tab: tabs[identifier],
    }));

    const [currentTab, setCurrentTab] = useUniqueState<
        TabContextProvider.Tab<_Tabs>
    >(() => {
        invariant(tabsArray[0], 'Tabs not provided');

        return getCurrentTab(initialTab);
    });

    const changeTab = useConst(() => {
        return tabsArray.reduce<Record<keyof _Tabs, VoidFunction>>((acc, key) => {
            acc[key] = () => {
                if (!onTabChange) return setCurrentTab(getCurrentTab(key));

                let isPrevented = false;

                const prevent = () => {
                    isPrevented = true;
                };

                onTabChange(prevent);

                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (!isPrevented) setCurrentTab(getCurrentTab(key));
            };

            return acc;
        }, {});
    });

    const transformedTabs = useConst(() => {
        return tabsArray.reduce<
            Record<keyof _Tabs, TabContextProvider.Tab<_Tabs>>
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
            Record<keyof _Tabs, boolean>
        >((acc, key) => {
            acc[key] = currentTab.identifier === key;

            return acc;
        }, {});
    }, [currentTab.identifier, tabs]);

    const tabProps = useConst(() => {
        return tabsArray.reduce<
            Record<keyof _Tabs, TabContextProvider.TabProps<string>>
        >((acc, key) => {
            acc[key] = {
                role: 'tab',
                controls: `tabPanel-${key.toString()}`,
                id: `tab-${key.toString()}`,
            };

            return acc;
        }, {});
    });

    const tabPanelProps = useConst(() => {
        return tabsArray.reduce<
            Record<keyof _Tabs, TabContextProvider.TabPanelProps<string>>
        >((acc, key) => {
            acc[key] = {
                id: `tabPanel-${key.toString()}`,
                labelledBy: `tab-${key.toString()}`,
            };

            return acc;
        }, {});
    });

    const contextValues = {
        transformedTabs,
        currentTab,
        changeTab,
        isActive,
        tabProps,
        tabPanelProps,
    } as createTabContext.Context<_Tabs>;

    const TabContext = context;

    return (
        <TabContext.Provider value={contextValues}>
            {children}
        </TabContext.Provider>
    );
};