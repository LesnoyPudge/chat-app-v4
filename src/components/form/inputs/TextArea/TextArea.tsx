import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useFunction } from '@lesnoypudge/utils-react';
import { FieldApi } from '@tanstack/react-form';
import { cn, createStyles } from '@/utils';
import { ChangeEventHandler, FC, FocusEventHandler } from 'react';



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
});

export namespace TextAreaPure {
    export type Props = (
        RT.PropsWithClassName
        & {
            value: string;
            name: string;
            label: string;
            id?: string;
            placeholder?: string;
            maxLength?: number;
            rows?: number;
            onChange: ChangeEventHandler<HTMLTextAreaElement>;
            onBlur: FocusEventHandler<HTMLTextAreaElement>;
        }
    );
}

export const TextAreaPure: FC<TextAreaPure.Props> = ({
    className = '',
    value,
    label,
    name,
    id,
    placeholder = '',
    maxLength = 128,
    rows = 6,
    onChange,
    onBlur,
}) => {
    const symbolsLeft = maxLength - value.length;

    return (
        <div className={cn(styles.wrapper, className)}>
            <textarea
                className={styles.textarea}
                id={id}
                value={value}
                name={name}
                aria-label={label}
                rows={rows}
                maxLength={maxLength}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
            />

            <div
                className={styles.symbolsLeft}
                aria-hidden={true}
            >
                {symbolsLeft}
            </div>
        </div>
    );
};

export namespace TextArea {
    export type Props = (
        Pick<
            TextAreaPure.Props,
            'className'
            | 'maxLength'
            | 'placeholder'
            | 'rows'
            | 'label'
        >
        & {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            field: FieldApi<any, any, any, any, string>;
        }
    );
}

export const TextArea: FC<TextArea.Props> = ({
    field,
    ...rest
}) => {
    const handleChange: TextAreaPure.Props['onChange'] = useFunction((e) => {
        field.handleChange(e.target.value);
    });

    return (
        <TextAreaPure
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={handleChange}
            {...rest}
        />
    );
};