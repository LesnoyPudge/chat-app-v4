import { FieldContext } from '../../context';
import { useFieldApi, useFormContext } from '../../hooks';
import { FormTypes } from '../../types';
import { renderFunction } from '@lesnoypudge/utils-react';



export const FieldProvider: FormTypes.FieldProvider.Fn = ({
    required,
    name,
    children,
}) => {
    const { name: formName } = useFormContext();
    const field = useFieldApi(name);

    const value: FormTypes.FieldContext = {
        id: `${formName}-${name._}`,
        required,
        field: field,
    };

    return (
        <FieldContext.Provider value={value}>
            {renderFunction(children, value)}
        </FieldContext.Provider>
    );
};