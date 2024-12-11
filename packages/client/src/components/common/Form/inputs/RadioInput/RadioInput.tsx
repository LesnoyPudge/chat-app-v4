import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useFunction } from '@lesnoypudge/utils-react';
import { FieldApi } from '@tanstack/react-form';
import { cn, createStyles } from '@utils';
import { ChangeEventHandler, FC, FocusEventHandler } from 'react';



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

export namespace RadioInputPure {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & {
            name: string;
            label: string;
            checked: boolean;
            value: string | number;
            onChange: ChangeEventHandler<HTMLInputElement>;
            onBlur: FocusEventHandler<HTMLInputElement>;
        }
    );
}

export const RadioInputPure: FC<RadioInputPure.Props> = ({
    className = '',
    name,
    label,
    checked,
    value,
    onChange,
    onBlur,
    children,
}) => {
    return (
        <label
            className={cn(
                styles.label.base,
                { [styles.label.active]: checked },
                className,
            )}
        >
            <input
                className={styles.input}
                type='radio'
                name={name}
                value={value}
                checked={checked}
                aria-label={label}
                onChange={onChange}
                onBlur={onBlur}
            />

            {children}
        </label>
    );
};

export namespace RadioInput {
    export type Props = (
        Pick<
            RadioInputPure.Props,
            'className'
            | 'label'
            | 'value'
            | 'children'
        >
        & {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            field: FieldApi<any, any, any, any, string | number>;
        }
    );
}

export const RadioInput: FC<RadioInput.Props> = ({
    field,
    value,
    children,
    ...rest
}) => {
    const isChecked = field.state.value === value;

    const handleChange: RadioInputPure.Props['onChange'] = useFunction((e) => {
        if (!e.target.checked) return;

        field.handleChange(value);
    });

    return (
        <RadioInputPure
            checked={isChecked}
            name={field.name}
            value={value}
            onChange={handleChange}
            onBlur={field.handleBlur}
            {...rest}
        >
            {children}
        </RadioInputPure>
    );
};