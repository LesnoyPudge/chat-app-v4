import { FC, useId } from 'react';
import { cn, createStyles } from '@utils';
import { useRefManager } from '@lesnoypudge/utils-react';



const styles = createStyles({
    input: 'h-10 w-full flex-1 rounded bg-primary-500 p-2 text-color-base',
    error: 'sr-only',
});

export namespace TextInput {
    export type Props = {
        className?: string;
        id?: string;
        name: string;
        placeholder?: string;
        type?: 'text' | 'email' | 'password';
        minLength?: number;
        maxLength?: number;
        inputMode?: 'text' | 'email';
        label?: string;
        required?: boolean;
        readOnly?: boolean;
        disabled?: boolean;
        autoComplete?: boolean;
        spellCheck?: boolean;
        error?: string;
        value?: string;
        inputRef?: useRefManager.RefManager<HTMLInputElement>;
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    };
}

export const TextInput: FC<TextInput.Props> = ({
    className = '',
    id,
    name,
    placeholder = '',
    type = 'text',
    minLength = 0,
    maxLength = 32,
    inputMode = 'text',
    label,
    required = false,
    readOnly = false,
    disabled = false,
    autoComplete = false,
    spellCheck = false,
    error,
    value,
    inputRef,
    onChange,
    onBlur,
}) => {
    const errorId = useId();

    const autoCompleteValue = autoComplete ? 'on' : 'off';

    return (
        <>
            <input
                className={cn(styles.input, className)}
                name={name}
                id={id}
                type={type}
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
                spellCheck={spellCheck}
                inputMode={inputMode}
                aria-required={required}
                readOnly={readOnly}
                disabled={disabled}
                autoComplete={autoCompleteValue}
                value={value}
                aria-label={label}
                aria-invalid={!!error}
                aria-describedby={errorId}
                ref={inputRef}
                onBlur={onBlur}
                onChange={onChange}
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