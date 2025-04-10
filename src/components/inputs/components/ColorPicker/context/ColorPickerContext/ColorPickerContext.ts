import { ContextSelectable } from '@lesnoypudge/utils-react';
import { ColorPickerTypes } from '../../types';



export const ColorPickerContext = ContextSelectable.createContext<
    ColorPickerTypes.Context
>();