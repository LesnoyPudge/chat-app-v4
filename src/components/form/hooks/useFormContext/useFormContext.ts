import { ContextSelectable } from '@lesnoypudge/utils-react';
import { FormContext } from '../../context';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { FormTypes } from '../../types';



export const useFormContext = <
    _Value extends T.UnknownRecord = T.UnknownRecord,
>() => {
    return ContextSelectable.useProxy(FormContext) as (
        FormTypes.FormContext<_Value>
    );
};