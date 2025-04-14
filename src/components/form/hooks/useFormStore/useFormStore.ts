import { useFormContext } from '../useFormContext';
import { useStore } from '../useStore';
import { FormTypes } from '../../types';


export const useFormStore: FormTypes.useFormStore.Fn = (
    selector,
) => {
    const { api } = useFormContext();

    return useStore(api.store, selector);
};