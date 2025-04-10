import { cn, createStyles } from '@/utils';
import { FC, useId } from 'react';
import { useTextAreaContext } from '../../hooks';
import { TextAreaTypes } from '../../types';



const styles = createStyles({
    wrapper: `
        relative 
        overflow-hidden 
        rounded 
        bg-primary-500 
        text-base 
        text-color-base
    `,
    textarea: 'block w-full overflow-y-scroll p-2.5 pr-7',
    symbolsLeft: `
        pointer-events-none 
        absolute 
        bottom-2 
        right-4 
        text-xs 
        text-color-muted
    `,
    error: 'sr-only',
});

export const TextAreaNode: FC<TextAreaTypes.Node.Props> = ({
    className = '',
}) => {
    const errorId = useId();
    const {
        disabled,
        id,
        label,
        maxLength,
        name,
        placeholder,
        readOnly,
        required,
        rows,
        value,
        error,
        onBlur,
        onChange,
    } = useTextAreaContext();

    const symbolsLeft = maxLength - value.length;

    return (
        <div className={cn(styles.wrapper, className)}>
            <textarea
                className={styles.textarea}
                id={id}
                value={value}
                name={name}
                aria-label={label}
                aria-invalid={!!error}
                aria-describedby={errorId}
                rows={rows}
                maxLength={maxLength}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                onChange={onChange}
                onBlur={onBlur}
            />

            <span
                className={styles.error}
                id={errorId}
                aria-live='assertive'
            >
                {error}
            </span>

            <div
                className={styles.symbolsLeft}
                aria-hidden={true}
            >
                {symbolsLeft}
            </div>
        </div>
    );
};