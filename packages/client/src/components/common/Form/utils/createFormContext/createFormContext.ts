import { T } from '@lesnoypudge/types-utils-base/namespace';
import { createContextSelectable } from '@lesnoypudge/utils-react';
import { UntypedFormContext } from '../../context';



export const createFormContext = <
    _Shape extends T.UnknownRecord,
>() => {
    return createContextSelectable<UntypedFormContext<_Shape>>();
};