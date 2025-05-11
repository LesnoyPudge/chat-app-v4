import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types/types';



export const createTabContext = <
    _Tabs extends Types.GenericTabs,
>() => {
    return {
        withName: <_Name extends string>(name: _Name) => {
            return ContextSelectable.createContextWithHooks<
                Types.Context<_Tabs>
            >().withName(name);
        },
    };
};