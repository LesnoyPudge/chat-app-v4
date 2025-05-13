import { ColorPickerTypes } from '../../types';
import { ColorPickerContext } from '../../context';
import { Form } from '@/components';
import {
    renderFunction,
    useThrottled,
    withDisplayName,
} from '@lesnoypudge/utils-react';
import { decorate } from '@lesnoypudge/macro';
import { memo } from 'react';



decorate(withDisplayName, 'ColorPickerProvider', decorate.target);
decorate(memo, decorate.target);

export const ColorPickerProvider = Form.createFieldProvider<
    ColorPickerTypes.Provider.Props
>(({
    label,
    innerRef,
    colorPresets = [],
    children,
}) => {
    const { field, id } = Form.useFieldContext<string>();
    const error = Form.useFieldError(field);
    const value = Form.useFieldValue(field);

    const setValue = useThrottled(field.setValue, 1_000 / 30);

    const contextValue: ColorPickerTypes.Context = {
        id,
        error,
        label,
        colorPresets,
        setValue,
        value,
        innerRef,
    };

    return (
        <ColorPickerContext.Provider value={contextValue}>
            {renderFunction(children, contextValue)}
        </ColorPickerContext.Provider>
    );
});