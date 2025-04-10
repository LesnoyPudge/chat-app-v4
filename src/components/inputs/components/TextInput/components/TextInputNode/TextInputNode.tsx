import { FC, useId } from 'react';
import { useTextInputContext } from '../../hooks';
import { cn, createStyles } from '@/utils';
import { TextInputTypes } from '../../types';



const styles = createStyles({
    input: `
        h-10 
        w-full 
        flex-1 
        rounded 
        bg-primary-500 
        p-2 
        text-color-base
    `,
    error: 'sr-only',
});

export const TextInputNodePure: FC<TextInputTypes.NodePure.Props> = ({
    className = '',
    autoComplete,
    disabled,
    error,
    id,
    inputMode,
    label,
    maxLength,
    minLength,
    name,
    onBlur,
    onChange,
    placeholder,
    readOnly,
    required,
    type,
    value,
    innerRef,
}) => {
    const errorId = useId();

    return (
        <>
            <input
                className={cn(styles.input, className)}
                aria-required={required}
                aria-label={label}
                aria-invalid={!!error}
                aria-describedby={errorId}
                ref={innerRef}
                value={value}
                type={type}
                autoComplete={autoComplete}
                disabled={disabled}
                id={id}
                inputMode={inputMode}
                maxLength={maxLength}
                minLength={minLength}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={placeholder}
                readOnly={readOnly}
            />

            <span
                className={styles.error}
                id={errorId}
                aria-live='assertive'
            >
                {error}
            </span>
        </>
    );
};

export const TextInputNode: FC<TextInputTypes.Node.Props> = (props) => {
    const context = useTextInputContext();

    return (
        <TextInputNodePure {...props} {...context}/>
    );
};