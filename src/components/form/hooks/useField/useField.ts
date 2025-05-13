import { TanStackForm } from '@/libs';
import { FormTypes } from '../../types';



export const useField: FormTypes.UseField = (
    form,
    name,
) => {
    const field = TanStackForm.useField({
        form: form.api,
        name: name._,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
    return field as any;
};