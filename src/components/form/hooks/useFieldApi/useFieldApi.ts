import { TanStackForm } from '@/libs';
import { useFormContext } from '../useFormContext';
import { FormTypes } from '../../types';



export const useFieldApi: FormTypes.UseFieldApi = (name) => {
    const { api } = useFormContext();

    return TanStackForm.useField({ form: api, name: name._ });
};