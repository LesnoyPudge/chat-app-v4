import { TextAreaTypes } from '../../types';
import { TextAreaContext } from '../../context';
import { renderFunction, useFunction } from '@lesnoypudge/utils-react';
import { Form } from '@/components';



export const TextAreaProvider = Form.createFieldProvider<
    TextAreaTypes.Provider.Props
>(({
    label,
    disabled = false,
    innerRef,
    maxLength = 128,
    placeholder = '',
    readOnly = false,
    rows = 6,
    children,
}) => {
    const { field, required, id } = Form.useFieldContext<string>();
    const error = Form.useFieldError();
    const value = Form.useStore(field.store, (v) => v.value);

    const contextValue: TextAreaTypes.Context = {
        id,
        disabled,
        error,
        label,
        maxLength,
        name: field.name,
        onBlur: field.handleBlur,
        onChange: useFunction((e) => field.handleChange(e.target.value)),
        placeholder,
        readOnly,
        required,
        setValue: field.setValue,
        value,
        innerRef,
        rows,
    };

    return (
        <TextAreaContext.Provider value={contextValue}>
            {renderFunction(children, contextValue)}
        </TextAreaContext.Provider>
    );
});