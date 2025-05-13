import { ContextSelectable } from '@lesnoypudge/utils-react';
import { ColorPickerTypes } from '../../types';



export const {
    ColorPickerContext,
    useColorPickerContextProxy,
    useColorPickerContextSelector,
} = ContextSelectable.createContextWithHooks<
    ColorPickerTypes.Context
>().withName('ColorPicker');