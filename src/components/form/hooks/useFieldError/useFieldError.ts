import { isDev } from '@/vars';
import { FormTypes } from '../../types';
import { useFieldContext } from '../useFieldContext';
import { useStore } from '../useStore';
import { invariant } from '@lesnoypudge/utils';



export const useFieldError = (): string | null => {
    const { field } = useFieldContext();

    const error = useStore(
        field.store,
        (v) => v.meta.errors[0] as FormTypes.ValidationError | undefined,
    );

    const errorMessage = error?.message ?? null;

    if (isDev) {
        invariant(errorMessage === null || typeof errorMessage === 'string');
    }

    return errorMessage;
};