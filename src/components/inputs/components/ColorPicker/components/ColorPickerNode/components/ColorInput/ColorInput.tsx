import { FC } from 'react';
import { HexColorPicker } from 'react-colorful';
import {
    useColorPickerContextProxy,
    useColorPickerContextSelector,
} from '../../../../context';



export const ColorInput: FC = () => {
    const { setValue } = useColorPickerContextProxy();

    const value = useColorPickerContextSelector((v) => v.value);

    return (
        <HexColorPicker
            color={value}
            onChange={setValue}
        />
    );
};