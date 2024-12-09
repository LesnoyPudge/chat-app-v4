import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useFunction } from '@lesnoypudge/utils-react';
import { FieldApi } from '@tanstack/react-form';
import { cn, createStyles } from '@utils';
import { ChangeEventHandler, FC, FocusEventHandler } from 'react';



const styles = createStyles({
    label: 'relative block cursor-pointer focus-within:outline-focus',
    input: 'peer sr-only',
});

export namespace CheckBoxPure {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & {
            name: string;
            label: string;
            checked: boolean;
            id?: string;
            onChange: ChangeEventHandler;
            onBlur: FocusEventHandler;
        }
    );
}

export const CheckBoxPure: FC<CheckBoxPure.Props> = ({
    className = '',
    name,
    label,
    checked,
    id,
    onChange,
    children,
}) => {
    return (
        <label className={cn(styles.label, className)}>
            <input
                className={styles.input}
                id={id}
                type='checkbox'
                name={name}
                checked={checked}
                aria-label={label}
                onChange={onChange}
            />

            {children}
        </label>
    );
};

export namespace CheckBox {
    export type Props = (
        Pick<
            CheckBoxPure.Props,
            'className'
            | 'children'
            | 'id'
            | 'label'
        >
        & {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            field: FieldApi<any, any, any, any, boolean> ;
        }
    );
}

export const CheckBox: FC<CheckBox.Props> = ({
    className,
    field,
    label,
    id,
    children,
}) => {
    const handleChange: ChangeEventHandler<
        HTMLInputElement
    > = useFunction((e) => {
        field.handleChange(e.target.checked);
    });

    return (
        <CheckBoxPure
            className={className}
            id={id}
            checked={field.state.value}
            label={label}
            name={field.name}
            onChange={handleChange}
            onBlur={field.handleBlur}
        >
            {children}
        </CheckBoxPure>
    );
};