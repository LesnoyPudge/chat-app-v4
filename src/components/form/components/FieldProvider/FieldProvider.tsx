import { TanStackForm } from '@/libs';
import { FieldContext } from '../../context';
import { useFormContext } from '../../hooks';
import { FormTypes } from '../../types';



export const FieldProvider: FormTypes.FieldProvider.Fn = ({
    required,
    name,
    children,
}) => {
    const { name: formName, api } = useFormContext();
    const field = TanStackForm.useField({ form: api, name: name._ });
    const _field = field as FormTypes.FieldContext['field'];

    const value: FormTypes.FieldContext = {
        id: `${formName}-${field.name}`,
        required,
        field: _field,
    };

    return (
        <FieldContext.Provider value={value}>
            {children}
        </FieldContext.Provider>
    );
};