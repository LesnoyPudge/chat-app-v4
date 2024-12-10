import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles, MBToBytes } from '@utils';
import { ChangeEventHandler, FC, FocusEventHandler } from 'react';
import { ACCEPTED_FILE_TYPE } from './acceptedFileType';
import { CUSTOM_STYLES } from '@vars';
import { FieldApi } from '@tanstack/react-form';
import { ClientEntities } from '@types';
import { useFileInput } from './useFileInput';
import { invariant, noop } from '@lesnoypudge/utils';



const styles = createStyles({
    wrapper: 'relative block focus-within:outline-focus',
    input: `${CUSTOM_STYLES.SR_INPUT} outline-transparent`,
});

export namespace FileInputPure {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & {
            id?: string;
            name: string;
            accept?: T.ValueOf<typeof ACCEPTED_FILE_TYPE>;
            multiple?: boolean;
            label: string;
            hidden?: boolean;
            onChange: ChangeEventHandler<HTMLInputElement>;
            onBlur: FocusEventHandler<HTMLInputElement>;
        }
    );
}

export const FileInputPure: FC<FileInputPure.Props> = ({
    className = '',
    id,
    label,
    name,
    accept = ACCEPTED_FILE_TYPE.ALL,
    multiple = false,
    hidden = false,
    onChange,
    onBlur,
    children,
}) => {
    return (
        <div className={cn(styles.wrapper, className)}>
            <input
                className={styles.input}
                id={id}
                accept={accept}
                multiple={multiple}
                type='file'
                name={name}
                tabIndex={hidden ? -1 : 0}
                aria-hidden={hidden}
                aria-label={label}
                onChange={onChange}
                onBlur={onBlur}
            />

            {children}
        </div>
    );
};

export namespace FileInput {
    export type Props = T.Simplify<
        Pick<
            FileInputPure.Props,
            | 'children'
            | 'className'
            | 'hidden'
            | 'label'
        >
        & Pick<
            useFileInput.Props,
            'accept'
        >
        & Partial<Pick<
            useFileInput.Props,
            'amountLimit'
            | 'sizeLimit'
            | 'onAmountLimit'
            | 'onInvalid'
            | 'onSizeLimit'
            | 'onUnacceptableType'
        >>
        & {

            field: FieldApi<
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                any, any, any, any,
                ClientEntities.File.Encoded | ClientEntities.File.Encoded[]
            >;
        }
    >;
}

export const FileInput: FC<FileInput.Props> = ({
    field,
    amountLimit = 1,
    sizeLimit = MBToBytes(1),
    accept,
    onAmountLimit = noop,
    onSizeLimit = noop,
    onUnacceptableType = noop,
    onInvalid = noop,
    children,
    ...rest
}) => {
    const isMultiple = amountLimit > 1;
    const fileState = (
        Array.isArray(field.state.value)
            ? field.state.value
            : [field.state.value]
    );

    const { onChange } = useFileInput({
        accept,
        amountLimit,
        files: fileState,
        sizeLimit,
        onAmountLimit,
        onInvalid,
        onSizeLimit,
        onUnacceptableType,
        setFiles: (files) => {
            invariant(files[0]);
            field.handleChange(isMultiple ? files : files[0]);
        },
    });

    return (
        <FileInputPure
            id={field.name}
            name={field.name}
            multiple={isMultiple}
            onChange={onChange}
            onBlur={field.handleBlur}
            {...rest}
        >
            {children}
        </FileInputPure>
    );
};