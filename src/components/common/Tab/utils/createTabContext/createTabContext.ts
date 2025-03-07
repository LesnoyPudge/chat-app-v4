import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export const createTabContext = <
    _Tabs extends Types.GenericTabs,
>() => ContextSelectable.createContext<Types.Context<_Tabs>>();