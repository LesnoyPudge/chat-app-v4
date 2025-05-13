import { cn, createStyles } from '@/utils';
import { FC, memo } from 'react';
import { ColorButton, ColorInput, ColorTextInput } from './components';
import { Iterate, withDisplayName } from '@lesnoypudge/utils-react';
import { useColorPickerContextProxy } from '../../context';
import { ColorPickerTypes } from '../../types';
import { decorate } from '@lesnoypudge/macro';



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

decorate(withDisplayName, 'ColorPickerNode', decorate.target);
decorate(memo, decorate.target);

export const ColorPickerNode: FC<ColorPickerTypes.Node.Props> = ({
    className = '',
}) => {
    const {
        colorPresets,
        id,
        label,
        innerRef,
    } = useColorPickerContextProxy();

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
            <ColorInput/>

            <ColorTextInput className={styles.colorInput}/>

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