import { FormTypes } from '../../types';
import { useFieldApi } from '../useFieldApi';
import { useStore } from '../useStore';



export const useFieldValue = <_Value = unknown>(
    name: FormTypes.GenericNameWrapper,
) => {
    const field = useFieldApi(name);

    return useStore(field.store, (v) => v.value as _Value);
};