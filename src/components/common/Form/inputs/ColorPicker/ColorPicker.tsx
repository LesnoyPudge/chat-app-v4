import { Button } from '@components';
import { FC } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { cn, createStyles } from '@utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import css from './ColorPicker.module.scss';
import { Iterate, Memo, useFunction, useThrottled } from '@lesnoypudge/utils-react';
import { FieldApi } from '@tanstack/react-form';



const styles = createStyles({
    colorPicker: `
        pointer-events-auto 
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
    presetButton: 'h-8 w-8 overflow-hidden rounded-md',
});


type ColorButtonProps = Pick<ColorPickerPure.Props, 'color' | 'onChange'>;

const ColorButton: FC<ColorButtonProps> = ({
    color,
    onChange,
}) => {
    const handleChange = useFunction(() => onChange(color));

    return (
        <Button
            className={styles.presetButton}
            label={color}
            style={{
                backgroundColor: color,
            }}
            onLeftClick={handleChange}
            key={color}
        />
    );
};

export namespace ColorPickerPure {
    export type Props = (
        RT.PropsWithClassName
        & {
            color: string;
            colorPresets?: string[];
            onChange: (color: string) => void;
        }
    );
}

export const ColorPickerPure: FC<ColorPickerPure.Props> = ({
    className = '',
    color,
    colorPresets = [],
    onChange,
}) => {
    const withColorPresets = !!colorPresets.length;

    return (
        <div className={cn(
            css.colorPicker,
            styles.colorPicker,
            className,
        )}>
            <HexColorPicker
                color={color}
                onChange={onChange}
            />

            <HexColorInput
                className={styles.colorInput}
                color={color}
                prefix='#'
                prefixed
                onChange={onChange}
            />

            <If condition={withColorPresets}>
                <div className={styles.presetsWrapper}>
                    <Iterate items={colorPresets}>
                        {(buttonColor, index) => (
                            <Memo key={index}>
                                <ColorButton
                                    color={buttonColor}
                                    onChange={onChange}
                                />
                            </Memo>
                        )}
                    </Iterate>
                </div>
            </If>
        </div>
    );
};

export namespace ColorPicker {
    export type Props = (
        Pick<
            ColorPickerPure.Props,
            'className' | 'colorPresets'
        >
        & {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
            field: FieldApi<any, any, any, any, string> ;
        }
);
}

export const ColorPicker: FC<ColorPicker.Props> = ({
    className,
    colorPresets,
    field,
}) => {
    const handleChange = useThrottled(field.handleChange, 1_000 / 60);

    return (
        <ColorPickerPure
            className={className}
            color={field.state.value}
            colorPresets={colorPresets}
            onChange={handleChange}
        />
    );
};