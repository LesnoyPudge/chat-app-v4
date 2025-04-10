import { CheckBoxTypes } from '../../types';
import { CheckBoxContext } from '../../context';
import { renderFunction, useFunction } from '@lesnoypudge/utils-react';
import { Form } from '@/components';



export const CheckBoxProvider = Form.createFieldProvider<
    CheckBoxTypes.Provider.Props
>(({
    label,
    innerRef,
    readOnly = false,
    disabled = false,
    children,
}) => {
    const { field, id } = Form.useFieldContext<boolean>();
    const error = Form.useFieldError();
    const value = Form.useStore(field.store, (v) => v.value);

    const contextValue: CheckBoxTypes.Context = {
        id,
        error,
        label,
        name: field.name,
        onBlur: field.handleBlur,
        onChange: useFunction((e) => field.handleChange(e.target.checked)),
        readOnly,
        disabled,
        setValue: field.setValue,
        value,
        innerRef,
    };

    return (
        <CheckBoxContext.Provider value={contextValue}>
            {renderFunction(children, contextValue)}
        </CheckBoxContext.Provider>
    );
});