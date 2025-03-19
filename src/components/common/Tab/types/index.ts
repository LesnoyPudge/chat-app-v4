import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { ContextSelectable, useRefManager } from '@lesnoypudge/utils-react';
import { PropsWithChildren, ReactNode } from 'react';
import { ListVariants } from '@/components';
import { Direction } from '@/types';



export namespace Types {
    type Orientation = Direction.Single;

    export type GenericTabs = Record<string, ReactNode>;

    export namespace TabContextProvider {
        export type Props<_Tabs extends GenericTabs> = (
            PropsWithChildren
            & {
                context: ContextSelectable.createContext.ContextSelectable<
                    Context<_Tabs>
                >;
                orientation?: Orientation;
                tabs: _Tabs;
                initialTab: keyof _Tabs;
                onTabChange?: (prevent: VoidFunction) => void;
            }
        );
    }

    export type Tab<VALUES> = {
        identifier: keyof VALUES;
        tab: ReactNode;
    };

    export type TabElementProps<KEY extends keyof GenericTabs> = {
        role: 'tab';
        controls: `tabPanel-${KEY}`;
        id: `tab-${KEY}`;
    };

    export type TabPanelElementProps<KEY extends keyof GenericTabs> = {
        id: `tabPanel-${KEY}`;
        labelledBy: `tab-${KEY}`;
        role: 'tabpanel';
    };

    export type Context<_Tabs extends GenericTabs> = {
        initialTabName: keyof _Tabs;
        orientation: Orientation;
        tabNames: (keyof _Tabs)[];
        tabName: { [_Name in keyof _Tabs]: _Name };
        transformedTabs: Record<keyof _Tabs, Tab<_Tabs>>;
        currentTab: Tab<_Tabs>;
        changeTab: Record<keyof _Tabs, VoidFunction>;
        isActive: Record<keyof _Tabs, boolean>;
        tabProps: Record<keyof _Tabs, TabElementProps<string>>;
        _tabPanelProps: Record<
            keyof _Tabs,
            TabPanelElementProps<string>
        >;
        _listRef: useRefManager.NullableRefManager<HTMLDivElement>;
    };

    export namespace TabList {
        export type Props<_Tabs extends GenericTabs> = (
            RT.PropsWithClassName
            & ListVariants.Variant1.Types.WithChildren<keyof _Tabs>
            & {
                context: ContextSelectable.createContext.ContextSelectable<
                    Context<_Tabs>
                >;
                label: string;
            }
        );
    }

    export namespace TabPanel {
        export type Props<_Tabs extends GenericTabs> = (
            RT.PropsWithChildrenAndClassName
            & {
                context: ContextSelectable.createContext.ContextSelectable<
                    Context<_Tabs>
                >;
                tabName: T.StringKeyOf<keyof _Tabs>;
            }
        );
    }
}