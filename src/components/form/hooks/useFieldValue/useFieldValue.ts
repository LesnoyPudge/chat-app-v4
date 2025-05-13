import { FormTypes } from '../../types';
import { useStore } from '../useStore';



export const useFieldValue: FormTypes.UseFieldValue = (fieldApi) => {
    return useStore(
        fieldApi.store,
        (v) => v.value,
    );
};