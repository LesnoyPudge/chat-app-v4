import { isDev } from '@/vars';
import { FormTypes } from '../../types';
import { useStore } from '../useStore';
import { invariant } from '@lesnoypudge/utils';



export const useFieldError: FormTypes.UseFieldError = (fieldApi) => {
    const error = useStore(
        fieldApi.store,
        (v) => v.meta.errors[0] as FormTypes.ValidationError | undefined,
    );

    const errorMessage = error?.message ?? null;

    if (isDev) {
        invariant(errorMessage === null || typeof errorMessage === 'string');
    }

    return errorMessage;
};