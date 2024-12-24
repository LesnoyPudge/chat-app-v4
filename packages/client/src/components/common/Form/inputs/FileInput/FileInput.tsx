import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@utils';
import { ChangeEventHandler, FC, FocusEventHandler } from 'react';
import { ACCEPTED_FILE_TYPE } from './acceptedFileType';
import { CUSTOM_STYLES } from '@vars';
import { FieldApi } from '@tanstack/react-form';
import { ClientEntities } from '@types';
import { useFileInput } from './useFileInput';
import { invariant, noop } from '@lesnoypudge/utils';
import { FILE_MAX_SIZE } from '@fakeShared';



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
    export type CastedType<_Amount extends number> = (
        _Amount extends 1
            ? null | ClientEntities.File.Encoded
            : null | ClientEntities.File.Encoded[]
    );

    export type Props<_Amount extends number> = T.Simplify<
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
            'onAmountLimit'
            | 'onInvalid'
            | 'onSizeLimit'
            | 'onUnacceptableType'
        >>
        & {
            amountLimit: _Amount;
            field: FieldApi<
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                any, any, any, any,
                CastedType<_Amount>
            >;
        }
    >;
}

export const FileInput = <_Amount extends number>({
    field,
    amountLimit,
    accept,
    onAmountLimit = noop,
    onSizeLimit = noop,
    onUnacceptableType = noop,
    onInvalid = noop,
    children,
    ...rest
}: FileInput.Props<_Amount>) => {
    const isMultiple = amountLimit > 1;
    const isOne = amountLimit === 1;

    const _state = (
        field.state.value === null
            ? []
            : isOne
                ? [field.state.value]
                : field.state.value
    );

    const fileState = (
        Array.isArray(_state) ? _state : [_state]
    ) as ClientEntities.File.Encoded[];

    const { onChange } = useFileInput({
        accept,
        amountLimit,
        files: fileState,
        sizeLimit: FILE_MAX_SIZE,
        onAmountLimit,
        onInvalid,
        onSizeLimit,
        onUnacceptableType,
        setFiles: (files) => {
            invariant(files[0]);
            field.handleChange((
                isOne ? files[0] : files
            ) as FileInput.CastedType<_Amount>);
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