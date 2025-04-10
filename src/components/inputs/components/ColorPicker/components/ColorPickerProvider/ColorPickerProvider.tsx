import { ColorPickerTypes } from '../../types';
import { ColorPickerContext } from '../../context';
import { Form } from '@/components';
import { renderFunction } from '@lesnoypudge/utils-react';



export const ColorPickerProvider = Form.createFieldProvider<
    ColorPickerTypes.Provider.Props
>(({
    label,
    innerRef,
    colorPresets = [],
    children,
}) => {
    const { field, id } = Form.useFieldContext<string>();
    const error = Form.useFieldError();
    const value = Form.useStore(field.store, (v) => v.value);

    const contextValue: ColorPickerTypes.Context = {
        id,
        error,
        label,
        colorPresets,
        setValue: field.setValue,
        value,
        innerRef,
    };

    return (
        <ColorPickerContext.Provider value={contextValue}>
            {renderFunction(children, contextValue)}
        </ColorPickerContext.Provider>
    );
});