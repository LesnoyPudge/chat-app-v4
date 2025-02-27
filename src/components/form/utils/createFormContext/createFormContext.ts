import { T } from '@lesnoypudge/types-utils-base/namespace';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { UntypedFormContext } from '../../context';



export const createFormContext = <
    _Shape extends T.UnknownRecord,
>() => {
    return ContextSelectable.createContext<UntypedFormContext<_Shape>>();
};