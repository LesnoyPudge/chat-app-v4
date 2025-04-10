import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import { useCheckBoxContext } from '../../hooks';
import { CheckBoxTypes } from '../../types';



const styles = createStyles({
    label: 'relative block cursor-pointer focus-within:outline-focus',
    input: 'peer sr-only',
});

export const CheckBoxNode: FC<CheckBoxTypes.Node.Props> = ({
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
        value,
        innerRef,
    } = useCheckBoxContext();

    return (
        <label className={cn(styles.label, className)}>
            <input
                id={id}
                className={styles.input}
                type='checkbox'
                name={name}
                checked={value}
                aria-label={label}
                readOnly={readOnly}
                disabled={disabled}
                ref={innerRef}
                onChange={onChange}
                onBlur={onBlur}
            />

            {children}
        </label>
    );
};