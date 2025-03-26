import * as components from './components';
import * as utils from './utils';
import * as types from './types';



export namespace Tab {
    export const {
        createTabContext,
        createTabs,
        createProps,
    } = utils;

    export import Current = components.CurrentTab;

    export import Provider = components.TabContextProvider;

    export import List = components.TabList;

    export import Panel = components.TabPanel;

    export import Types = types.Types;
}