import { useState } from 'react';
import { TextInputTypes } from '../../types';
import { TextInputContext } from '../../context';
import { renderFunction, useFunction } from '@lesnoypudge/utils-react';
import { Form } from '@/components';



export const TextInputProvider = Form.createFieldProvider<
    TextInputTypes.Provider.Props
>(({
    label,
    disabled = false,
    innerRef,
    inputMode = 'text',
    maxLength = 32,
    minLength = 0,
    placeholder = '',
    readOnly = false,
    type = 'text',
    autoComplete = 'off',
    children,
}) => {
    const { field, required, id } = Form.useFieldContext<string>();
    const [changeableType, setChangeableType] = useState(type);
    const error = Form.useFieldError();
    const value = Form.useStore(field.store, (v) => v.value);

    const contextValue: TextInputTypes.Context = {
        id,
        disabled,
        autoComplete,
        error,
        inputMode,
        label,
        maxLength,
        minLength,
        name: field.name,
        onBlur: field.handleBlur,
        onChange: useFunction((e) => field.handleChange(e.target.value)),
        placeholder,
        readOnly,
        required,
        setType: setChangeableType,
        setValue: field.setValue,
        type: changeableType,
        initialType: type,
        value,
        innerRef,
    };

    return (
        <TextInputContext.Provider value={contextValue}>
            {renderFunction(children, contextValue)}
        </TextInputContext.Provider>
    );
});