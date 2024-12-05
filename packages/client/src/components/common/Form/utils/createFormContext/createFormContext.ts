import { T } from '@lesnoypudge/types-utils-base/namespace';
import { createContextSelectable } from '@lesnoypudge/utils-react';
import { ReactFormExtendedApi, Validator } from '@tanstack/react-form';



export const createFormContext = <
    _Shape extends T.UnknownRecord,
>() => {
    return createContextSelectable<
        Required<ReactFormExtendedApi<_Shape, Validator<Partial<_Shape>>>>
    >();
};