import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC } from 'react';
import { HexColorInput } from 'react-colorful';
import {
    useColorPickerContextProxy,
    useColorPickerContextSelector,
} from '../../../../context';



export const ColorTextInput: FC<RT.PropsWithClassName> = ({
    className = '',
}) => {
    const { setValue } = useColorPickerContextProxy();

    const value = useColorPickerContextSelector((v) => v.value);

    return (
        <HexColorInput
            className={className}
            color={value}
            prefix='#'
            prefixed
            onChange={setValue}
        />
    );
};