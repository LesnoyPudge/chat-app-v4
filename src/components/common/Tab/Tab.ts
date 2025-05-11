import * as components from './components';
import * as utils from './utils';
import * as types from './types';



export namespace Tab {
    export import Types = types.Types;

    export const {
        createTabContext,
        createTabs,
        createProps,
        createTypedTabs,
    } = utils;

    export const {
        CurrentTab: Current,
        TabContextProvider: Provider,
        TabList: List,
        TabPanel: Panel,
        TabItem: Item,
    } = components;
}