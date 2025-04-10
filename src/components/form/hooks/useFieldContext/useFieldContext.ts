import { ContextSelectable } from '@lesnoypudge/utils-react';
import { FieldContext } from '../../context';
import { FormTypes } from '../../types';



export const useFieldContext = <_Value = unknown>() => {
    return ContextSelectable.useProxy(FieldContext) as (
        FormTypes.FieldContext<_Value>
    );
};