import { TanStackForm } from '@/libs';
import { useFormContext } from '../useFormContext';
import { FormTypes } from '../../types';



export const useFieldApi = <_Value>(
    name: FormTypes.GenericNameWrapper,
) => {
    const { api } = useFormContext();

    return TanStackForm.useField({ form: api, name: name._ }) as (
        FormTypes.FieldApiWrapper<_Value>
    );
};