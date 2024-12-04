import { CurrentTab, TabContextProvider } from './components';
import { TabContext } from './context';



export namespace Tab {
    export const Context = TabContext;

    export type Context<
        _Tabs extends TabContextProvider.GenericTabs,
    > = TabContext<_Tabs>;

    export const Current = CurrentTab;

    export import Provider = TabContextProvider;
}