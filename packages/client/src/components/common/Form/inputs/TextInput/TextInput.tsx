import { FC } from 'react';
import { cn, createStyles } from '@utils';
import { useContextSelector } from '@lesnoypudge/utils-react';
import { TextInputContext } from './context';
import { useTextInput, useTextInputDefaults } from './hooks';
import { invariant } from '@lesnoypudge/utils';
import { TextInputTypes } from './textInputTypes';
import { T } from '@lesnoypudge/types-utils-base/namespace';



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
                aria-invalid={!!rest.error}
                aria-describedby={rest.errorId}
                ref={rest.innerRef}
            />

            <span
                className={styles.error}
                id={rest.errorId}
                aria-live='assertive'
            >
                {rest.error}
            </span>
        </>
    );
};

export namespace TextInput {
    export type Props = TextInputTypes.NodeProps;
}

export const TextInput: FC<TextInput.Props> = (props) => {
    const context = useContextSelector(TextInputContext) as TextInputContext | undefined;
    const field = props.field ?? context?.field;
    invariant(field);

    const type = props.type ?? context?.type;
    invariant(type);

    const hook = useTextInput({
        field,
        type,
    });

    const propsWithDefaults = useTextInputDefaults(props);

    const pureProps: T.StrictOmit<TextInputPure.Props, 'children'> = {
        innerRef: props.innerRef,
        label: props.label,
        ...context,
        ...propsWithDefaults,
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
        <TextInputPure {...pureProps}>
            {props.children}
        </TextInputPure>
    );
};