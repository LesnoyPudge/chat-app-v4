import { FC } from 'react';
import { ColorPickerTypes } from '../../../../types';
import { useFunction } from '@lesnoypudge/utils-react';
import { useColorPickerContext } from '../../../../hooks';
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
    const { setValue } = useColorPickerContext();
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