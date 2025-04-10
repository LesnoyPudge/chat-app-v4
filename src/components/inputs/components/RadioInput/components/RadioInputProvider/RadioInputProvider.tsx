import { RadioInputTypes } from '../../types';
import { RadioInputContext } from '../../context';
import { renderFunction, useFunction } from '@lesnoypudge/utils-react';
import { Form } from '@/components';



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
    const { field, required, id } = Form.useFieldContext<boolean>();
    const error = Form.useFieldError();
    const value = Form.useStore(field.store, (v) => v.value);

    const contextValue: RadioInputTypes.Context = {
        id,
        disabled,
        error,
        label,
        valueName,
        name: field.name,
        onBlur: field.handleBlur,
        onChange: useFunction((e) => field.handleChange(e.target.checked)),
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