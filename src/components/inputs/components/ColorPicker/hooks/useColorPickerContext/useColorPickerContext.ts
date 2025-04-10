import { ContextSelectable } from '@lesnoypudge/utils-react';
import { ColorPickerContext } from '../../context';



export const useColorPickerContext = () => {
    return ContextSelectable.useProxy(ColorPickerContext);
};