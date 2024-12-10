import { ChangeEventHandler, FC, FocusEventHandler, useId } from 'react';
import { cn, createStyles } from '@utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { PropsWithInnerRef } from '@types';
import { FieldApi, ValidationError } from '@tanstack/react-form';
import { useFunction } from '@lesnoypudge/utils-react';



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

export namespace TextInputPure {
    export type Props = (
        RT.PropsWithClassName
        & PropsWithInnerRef<'input'>
        & {
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
            error?: ValidationError;
            errorId: string;
            value: string;
            onChange: ChangeEventHandler<HTMLInputElement>;
            onBlur: FocusEventHandler<HTMLInputElement>;
        }
    );
}

export const TextInputPure: FC<TextInputPure.Props> = ({
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
    errorId,
    value,
    innerRef,
    onChange,
    onBlur,
}) => {
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
                ref={innerRef}
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

export namespace TextInput {
    export type Props = (
        Pick<
            TextInputPure.Props,
            'autoComplete'
            | 'className'
            | 'disabled'
            | 'innerRef'
            | 'inputMode'
            | 'label'
            | 'maxLength'
            | 'minLength'
            | 'placeholder'
            | 'readOnly'
            | 'required'
            | 'spellCheck'
            | 'type'
        >
        & {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            field: FieldApi<any, any, any, any, string>;
        }
    );
}

export const TextInput: FC<TextInput.Props> = ({
    field,
    ...rest
}) => {
    const errorId = useId();

    const handleChange: TextInputPure.Props['onChange'] = useFunction((e) => {
        field.handleChange(e.target.value);
    });

    return (
        <TextInputPure
            id={field.name}
            name={field.name}
            error={field.state.meta.errors[0]}
            errorId={errorId}
            value={field.state.value}
            onChange={handleChange}
            onBlur={field.handleBlur}
            {...rest}
        />
    );
};