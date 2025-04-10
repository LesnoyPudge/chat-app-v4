import { SliderInputTypes } from '../../types';
import { SliderInputContext } from '../../context';
import { Form } from '@/components';
import { renderFunction } from '@lesnoypudge/utils-react';



const defaultFormat = {
    to: (value: number) => {
        return `${value}px`;
    },
} satisfies SliderInputTypes.Context['format'];

export const SliderInputProvider = Form.createFieldProvider<
    SliderInputTypes.Provider.Props
>(({
    label,
    disabled = false,
    innerRef,
    readOnly = false,
    range,
    format = defaultFormat,
    children,
}) => {
    const { field, required, id } = Form.useFieldContext<number>();
    const error = Form.useFieldError();
    const value = Form.useStore(field.store, (v) => v.value);

    const contextValue: SliderInputTypes.Context = {
        id,
        disabled,
        error,
        label,
        name: field.name,
        onBlur: field.handleBlur,
        readOnly,
        required,
        setValue: field.setValue,
        format,
        range,
        value,
        innerRef,
    };

    return (
        <SliderInputContext.Provider value={contextValue}>
            {renderFunction(children, contextValue)}
        </SliderInputContext.Provider>
    );
});