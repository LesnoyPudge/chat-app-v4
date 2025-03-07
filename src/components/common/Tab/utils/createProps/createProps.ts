import { invariant } from '@lesnoypudge/utils';
import { Types } from '../../types';



export const createProps = <
    _Tabs extends Types.GenericTabs,
>(tabs: _Tabs) => {
    const tabNames = Object.keys<_Tabs>(tabs);
    invariant(tabNames.length);

    const tabProps = tabNames.reduce<
        Types.Context<_Tabs>['_tabProps']
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
            id: `tabPanel-${name.toString()}`,
            labelledBy: `tab-${name.toString()}`,
            role: 'tabpanel',
        };

        return acc;
    }, {});

    const tabName = tabNames.reduce<
        Types.Context<_Tabs>['tabName']
    >((acc, name) => {
        acc[name] = name;

        return acc;
    }, {});

    return {
        tabProps,
        tabPanelProps,
        tabNames,
        tabName,
    };
};