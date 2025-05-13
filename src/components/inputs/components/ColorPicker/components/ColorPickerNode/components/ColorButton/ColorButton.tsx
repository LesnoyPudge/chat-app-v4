import { FC } from 'react';
import { ColorPickerTypes } from '../../../../types';
import { useFunction } from '@lesnoypudge/utils-react';
import { useColorPickerContextProxy } from '../../../../context';
import { createStyles } from '@/utils';
import { Button } from '@/components';



type Props = {
    color: ColorPickerTypes.Context['value'];
};

const styles = createStyles({
    button: 'size-8 overflow-hidden rounded-md',
});

export const ColorButton: FC<Props> = ({
    color,
}) => {
    const { setValue } = useColorPickerContextProxy();
    const handleChange = useFunction(() => setValue(color));

    return (
        <Button
            className={styles.button}
            label={color}
            style={{
                backgroundColor: color,
            }}
            onLeftClick={handleChange}
            key={color}
        />
    );
};