import { invariant } from '@lesnoypudge/utils';
import { Types } from '../../types/types';



export const createProps = <
    _Tabs extends Types.GenericTabs,
>(tabs: _Tabs) => {
    const tabNames = Object.keys<_Tabs>(tabs);
    invariant(tabNames.length);

    const tabProps = tabNames.reduce<
        Types.Context<_Tabs>['tabProps']
    >((acc, name) => {
        acc[name] = {
            role: 'tab',
            controls: `tabPanel-${name.toString()}`,
            id: `tab-${name.toString()}`,
        };

        return acc;
    }, {});

    const tabPanelProps = tabNames.reduce<
        Types.Context<_Tabs>['_tabPanelProps']
    >((acc, name) => {
        acc[name] = {
            'id': `tabPanel-${name.toString()}`,
            'aria-labelledby': `tab-${name.toString()}`,
            'role': 'tabpanel',
        };

        return acc;
    }, {});

    const tabNameTable = tabNames.reduce<
        Types.Context<_Tabs>['tabNameTable']
    >((acc, name) => {
        acc[name] = name;

        return acc;
    }, {});

    return {
        tabProps,
        tabPanelProps,
        tabNames,
        tabNameTable,
    };
};