import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import { ColorButton } from './components';
import { Iterate } from '@lesnoypudge/utils-react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { useColorPickerContext } from '../../hooks';
import { ColorPickerTypes } from '../../types';



const styles = createStyles({
    colorPicker: `
        flex 
        shrink-0 
        flex-col 
        gap-4
        rounded-md 
        bg-primary-200 
        p-4 
        shadow-elevation-high
    `,
    colorInput: 'rounded bg-primary-500 p-2.5',
    presetsWrapper: 'flex justify-between gap-1',
});

export const ColorPickerNode: FC<ColorPickerTypes.Node.Props> = ({
    className = '',
}) => {
    const {
        colorPresets,
        id,
        label,
        value,
        innerRef,
        setValue,
    } = useColorPickerContext();

    const withColorPresets = !!colorPresets.length;

    return (
        <div
            id={id}
            className={cn(
                'ColorPickerNode',
                styles.colorPicker,
                className,
            )}
            ref={innerRef}
            aria-label={label}
        >
            <HexColorPicker
                color={value}
                onChange={setValue}
            />

            <HexColorInput
                className={styles.colorInput}
                color={value}
                prefix='#'
                prefixed
                onChange={setValue}
            />

            <If condition={withColorPresets}>
                <div className={styles.presetsWrapper}>
                    <Iterate
                        items={colorPresets}
                        getKey={(_, i) => i}
                    >
                        {(buttonColor) => (
                            <ColorButton color={buttonColor}/>
                        )}
                    </Iterate>
                </div>
            </If>
        </div>
    );
};