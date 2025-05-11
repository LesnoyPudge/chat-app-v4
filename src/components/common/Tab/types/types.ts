import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import {
    ContextSelectable,
    Iterate,
    useRefManager,
} from '@lesnoypudge/utils-react';
import { PropsWithChildren, ReactNode } from 'react';
import { Direction } from '@/types';
import { KeyboardNavigation } from 'src/components/common/KeyboardNavigation';
import { Button } from 'src/components/common/Button';



export namespace Types {
    type Orientation = Direction.Single;

    export type GenericTabs = Record<string, ReactNode>;

    export type OnTabChange = (prevent: VoidFunction) => void;

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
        'id': `tabPanel-${KEY}`;
        'aria-labelledby': `tab-${KEY}`;
        'role': 'tabpanel';
    };

    export type Context<_Tabs extends GenericTabs> = {
        initialTabName: keyof _Tabs;
        orientation: Orientation;
        label: string;
        tabNames: (keyof _Tabs)[];
        tabNameTable: { [_Name in keyof _Tabs]: _Name };
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

    type WithContext<_Tabs extends GenericTabs> = {
        context: ContextSelectable.createContext.ContextSelectable<
            Context<_Tabs>
        >;
    };

    type WithTabName<_Tabs extends GenericTabs> = {
        tabName: T.StringKeyOf<_Tabs>;
    };

    export namespace Provider {
        export type Props<_Tabs extends GenericTabs> = (
            PropsWithChildren
            & WithContext<_Tabs>
            & {
                orientation?: Orientation;
                tabs: _Tabs;
                initialTab: keyof _Tabs;
                label: string;
                onTabChange?: OnTabChange;
            }
        );
    }

    export namespace List {
        export type Props<_Tabs extends GenericTabs> = (
            RT.PropsWithClassName
            & RT.PropsWithRenderFunctionOrNode<
                Iterate.ChildrenArgsWithItems<keyof _Tabs>
            >
            & WithContext<_Tabs>
        );
    }

    export namespace Panel {
        export type Props<_Tabs extends GenericTabs> = (
            RT.PropsWithChildrenAndClassName
            & WithContext<_Tabs>
            & WithTabName<_Tabs>
        );
    }

    export namespace Current {
        export type Props<
            _Tabs extends Types.GenericTabs,
        > = WithContext<_Tabs>;
    }

    export namespace Item {
        export type ChildrenProps = T.Simplify<(
            // T.Except<
            //     KeyboardNavigation.Types.Item.ChildrenProps,
            //     'isCurrentId' | 'itemId' | 'setId' | 'elementRef'
            // >
            Pick<
                Required<Button.Props>,
                keyof TabElementProps<string>
                | 'onLeftClick'
                | 'isActive'
                | 'innerRef'
                | 'tabIndex'
            >
            // & {
            //     buttonRef: useRefManager.NullableRefManager<
            //         HTMLButtonElement
            //     >;
            //     isActive: boolean;
            //     navigateToTab: VoidFunction;
            //     tabName: string;
            //     // tabElementProps: TabElementProps<string>;
            // }
        )>;

        export type Props<_Tabs extends GenericTabs> = (
            WithContext<_Tabs>
            & WithTabName<_Tabs>
            & RT.PropsWithRenderFunction<[props: ChildrenProps]>
        );
    }
}