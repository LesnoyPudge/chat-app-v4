import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export namespace CurrentTab {
    export type Props<
        _Tabs extends Types.GenericTabs,
    > = {
        context: ContextSelectable.createContext.ContextSelectable<
            Types.Context<_Tabs>
        >;
    };
}

export const CurrentTab = <
    _Tabs extends Types.GenericTabs,
>({ context }: CurrentTab.Props<_Tabs>) => {
    const currentTab = ContextSelectable.useSelector(context, (v) => {
        return v.currentTab;
    });

    return currentTab.tab;
};