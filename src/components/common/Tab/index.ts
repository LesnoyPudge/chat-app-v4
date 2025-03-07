import * as c from './components';
import * as utils from './utils';
import * as types from './types';



export namespace Tab {
    export const {
        createTabContext,
        createTabs,
        createProps,
    } = utils;

    export import Current = c.CurrentTab;

    export import Provider = c.TabContextProvider;

    export import List = c.TabList;

    export import Panel = c.TabPanel;

    export import Types = types.Types;
}