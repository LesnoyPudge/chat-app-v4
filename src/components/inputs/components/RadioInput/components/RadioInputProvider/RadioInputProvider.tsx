import { RadioInputTypes } from '../../types';
import { RadioInputContext } from '../../context';
import { renderFunction, useFunction } from '@lesnoypudge/utils-react';
import { Form } from '@/components';
import { invariant } from '@lesnoypudge/utils';



export const RadioInputProvider = Form.createFieldProvider<
    RadioInputTypes.Provider.Props
>(({
    label,
    disabled = false,
    innerRef,
    readOnly = false,
    valueName,
    children,
}) => {
    const { field, required, id } = Form.useFieldContext<string>();
    const error = Form.useFieldError(field);
    const value = Form.useFieldValue(field);

    invariant(
        typeof value === 'string',
        'Radio input should take string values',
    );

    const contextValue: RadioInputTypes.Context = {
        id,
        disabled,
        error,
        label,
        valueName,
        name: field.name,
        onBlur: field.handleBlur,
        onChange: useFunction((e) => {
            if (!e.target.checked) return;

            field.handleChange(valueName);
        }),
        readOnly,
        required,
        setValue: field.setValue,
        value,
        innerRef,
    };

    return (
        <RadioInputContext.Provider value={contextValue}>
            {renderFunction(children, contextValue)}
        </RadioInputContext.Provider>
    );
});