import { TabContextProvider } from '../../components';



export const createTabs = <
    _Tabs extends TabContextProvider.GenericTabs,
>(tabs: _Tabs): _Tabs => {
    return tabs;
};