import { FC } from 'react';
import { cn, createStyles } from '@utils';
import { useContextSelector } from '@lesnoypudge/utils-react';
import { TextInputContext } from './context';
import { useTextInput, useTextInputDefaults } from './hooks';
import { invariant } from '@lesnoypudge/utils';
import { TextInputTypes } from './textInputTypes';



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
    export type Props = TextInputTypes.NodePureProps;
}

export const TextInputPure: FC<TextInputPure.Props> = ({
    className,
    innerRef,
    errorId,
    error,
    ...rest
}) => {
    const autoCompleteValue = rest.autoComplete ? 'on' : 'off';

    return (
        <>
            <input
                className={cn(styles.input, className)}
                {...rest}
                aria-required={rest.required}
                autoComplete={autoCompleteValue}
                aria-label={rest.label}
                aria-invalid={!!error}
                aria-describedby={errorId}
                ref={innerRef}
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
    export type Props = TextInputTypes.NodeProps;
}

export const TextInput: FC<TextInput.Props> = (props) => {
    const context = useContextSelector(
        TextInputContext,
    ) as TextInputContext | undefined;

    const field = props.field ?? context?.field;
    invariant(field);

    const type = props.type ?? context?.type;
    invariant(type);

    const label = props.label ?? context?.label;
    invariant(label);

    const hook = useTextInput({
        field,
        type,
    });

    const propsWithDefaults = useTextInputDefaults(props);

    const {
        initialType: _,
        togglePasswordType: __,
        ...safeProps
    } = context ?? {};

    const pureProps: TextInputPure.Props = {
        innerRef: props.innerRef,
        label,
        ...propsWithDefaults,
        ...safeProps,
        errorId: context?.errorId ?? hook.errorId,
        type: context?.type ?? hook.type,
        id: field.name,
        name: field.name,
        error: field.state.meta.errors[0],
        value: field.state.value,
        onChange: context?.onChange ?? hook.onChange,
        onBlur: field.handleBlur,
    };

    return (
        <TextInputPure {...pureProps}/>
    );
};