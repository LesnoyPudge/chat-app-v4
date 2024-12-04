import { CurrentTab, TabContextProvider } from './components';
import * as utils from './utils';



export namespace Tab {
    export const createTabContext = utils.createTabContext;

    export const Current = CurrentTab;

    export import Provider = TabContextProvider;
}