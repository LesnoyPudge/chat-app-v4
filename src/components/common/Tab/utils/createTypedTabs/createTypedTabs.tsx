import { createTabs } from '../createTabs';
import { Types } from '../../types';
import { createProps } from '../createProps';
import { createTabContext } from '../createTabContext';
import {
    CurrentTab,
    TabContextProvider,
    TabItem,
    TabList,
    TabPanel,
} from '../../components';
import { FC } from 'react';
import { T } from '@lesnoypudge/types-utils-base/namespace';



type Options<
    _Tabs extends Types.GenericTabs,
    _Name extends string,
> = {
    tabs: _Tabs;
    name: _Name;
};

type Result<
    _Tabs extends Types.GenericTabs,
    _Name extends string,
> = (
    Pick<ReturnType<typeof createProps<_Tabs>>, 'tabNameTable'>
    & Pick<
        ReturnType<ReturnType<typeof createTabContext<_Tabs>>['withName']>,
        'useProxy' | 'useSelector'
    >
    & {
        Current: FC;
        Provider: FC<T.Except<
            Types.Provider.Props<_Tabs>,
            'context' | 'tabs'
        >>;
        List: FC<T.Except<
            Types.List.Props<_Tabs>,
            'context'
        >>;
        Panel: {
            [_TabName in keyof _Tabs]: FC<T.Except<
                Types.Panel.Props<_Tabs>,
                'context' | 'tabName'
            >>
        };
        Item: {
            [_TabName in keyof _Tabs]: FC<T.Except<
                Types.Item.Props<_Tabs>,
                'context' | 'tabName'
            >>
        };
    }
);

type Return<
    _Tabs extends Types.GenericTabs,
    _Name extends string,
> = {
    [x in _Name as `${_Name}Tabs`]: Result<_Tabs, _Name>
};

export const createTypedTabs = <
    _Tabs extends Types.GenericTabs,
    _Name extends string,
>({
    name,
    tabs,
}: Options<_Tabs, _Name>): Return<_Tabs, _Name> => {
    const _tabs = createTabs(tabs);
    const {
        tabNameTable,
        tabNames,
    } = createProps(tabs);

    const {
        Context,
        useProxy,
        useSelector,
    } = createTabContext<typeof _tabs>().withName(name);

    const result: Result<_Tabs, _Name> = {
        tabNameTable: tabNameTable,

        useProxy,

        useSelector,

        Current: () => <CurrentTab context={Context}/>,

        Provider: (props) => (
            <TabContextProvider
                context={Context}
                tabs={_tabs}
                {...props}
            />
        ),

        List: (props) => <TabList context={Context} {...props}/>,

        Panel: (() => {
            const result = {} as Result<_Tabs, _Name>['Panel'];

            tabNames.forEach((tabName) => {
                const panel: (
                    Result<_Tabs, _Name>['Panel'][string]
                ) = (props) => (
                    <TabPanel
                        context={Context}
                        tabName={tabName as T.StringKeyOf<_Tabs>}
                        {...props}
                    />
                );

                Object.assign(result, {
                    [tabName]: panel,
                });
            });

            return result;
        })(),

        Item: (() => {
            const result = {} as Result<_Tabs, _Name>['Item'];

            tabNames.forEach((tabName) => {
                const item: (
                    Result<_Tabs, _Name>['Item'][string]
                ) = (props) => (
                    <TabItem
                        context={Context}
                        tabName={tabName as T.StringKeyOf<_Tabs>}
                        {...props}
                    />
                );

                Object.assign(result, {
                    [tabName]: item,
                });
            });

            return result;
        })(),
    };

    const returnValue = {
        [`${name}Tabs`]: result,
    } as Return<_Tabs, _Name>;

    return returnValue;
};