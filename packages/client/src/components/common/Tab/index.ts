import * as c from './components';
import * as utils from './utils';



export namespace Tab {
    export const {
        createTabContext,
        createTabs,
    } = utils;

    export import Current = c.CurrentTab;

    export import Provider = c.TabContextProvider;
}