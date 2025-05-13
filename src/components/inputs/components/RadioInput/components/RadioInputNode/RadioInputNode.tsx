import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import { useRadioInputContext } from '../../hooks';
import { RadioInputTypes } from '../../types';



const styles = createStyles({
    label: {
        base: `
            flex 
            min-h-[47px] 
            cursor-pointer 
            items-center 
            gap-3.5 
            rounded-md 
            bg-primary-300
            p-2.5 
            text-color-secondary 
            focus-within:outline-focus 
            hover:bg-primary-100 
            hover:text-color-primary
        `,
        active: 'bg-primary-100 text-color-primary',
    },
    input: 'peer sr-only',
});

export const RadioInputNode: FC<RadioInputTypes.Node.Props> = ({
    className = '',
    children,
}) => {
    const {
        disabled,
        id,
        label,
        name,
        onBlur,
        onChange,
        readOnly,
        required,
        value,
        valueName,
        innerRef,
    } = useRadioInputContext();

    const isChecked = value === valueName;

    return (
        <label
            className={cn(
                styles.label.base,
                isChecked && styles.label.active,
                className,
            )}
        >
            <input
                id={id}
                className={styles.input}
                type='radio'
                name={name}
                value={valueName}
                checked={isChecked}
                aria-label={label}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                ref={innerRef}
                onChange={onChange}
                onBlur={onBlur}
            />

            {children}
        </label>
    );
};