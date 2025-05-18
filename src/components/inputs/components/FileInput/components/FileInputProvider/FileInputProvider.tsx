import { FileInputTypes } from '../../types';
import { FileInputContext } from '../../context';
import { renderFunction, useFunction } from '@lesnoypudge/utils-react';
import { invariant, isCallable, noop } from '@lesnoypudge/utils';
import { isDev } from '@/vars';
import { FILE_MAX_SIZE_BYTES } from '@/fakeShared';
import { Form } from '@/components';



export const FileInputProvider = Form.createFieldProvider(<
    _Amount extends number,
>({
    label,
    disabled = false,
    innerRef,
    readOnly = false,
    accept,
    amountLimit,
    onAmountLimit = noop,
    onInvalid = noop,
    onSizeLimit = noop,
    onUnacceptableType = noop,
    sizeLimit = FILE_MAX_SIZE_BYTES,
    hidden = false,
    children,
}: FileInputTypes.Provider.Props<_Amount>) => {
    if (isDev) {
        invariant(amountLimit > 0);
    }

    const { field, required, id } = Form.useFieldContext<
        FileInputTypes.Context['value']
    >();
    const error = Form.useFieldError(field);
    const value = Form.useFieldValue(field);

    const isMultiple = amountLimit > 1;

    const extractFiles = (newFiles: FileInputTypes.Context['value']) => {
        if (newFiles === null) return null;

        if (Array.isArray(newFiles)) {
            return isMultiple ? newFiles : newFiles[0] ?? null;
        }

        return isMultiple ? [newFiles] : newFiles;
    };

    const setValue: (
        FileInputTypes.Context['setValue']
    ) = useFunction((updaterOrValue) => {
        if (isCallable(updaterOrValue)) {
            field.setValue((prev) => extractFiles(updaterOrValue(prev)));
            return;
        }

        field.setValue(extractFiles(updaterOrValue));
    });

    const contextValue: FileInputTypes.Context = {
        id,
        disabled,
        error,
        label,
        name: field.name,
        onBlur: field.handleBlur,
        readOnly,
        required,
        setValue,
        value,
        innerRef,
        accept,
        amountLimit: amountLimit as -1,
        multiple: isMultiple,
        onAmountLimit,
        onInvalid,
        onSizeLimit,
        onUnacceptableType,
        sizeLimit,
        hidden,
    };

    return (
        <FileInputContext.Provider value={contextValue}>
            {renderFunction(
                children,
                contextValue as FileInputTypes.Context<_Amount>,
            )}
        </FileInputContext.Provider>
    );
});