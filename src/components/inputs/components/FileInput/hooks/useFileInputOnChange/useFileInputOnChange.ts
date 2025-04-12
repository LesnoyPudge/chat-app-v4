import { useFunction, useIsMounted } from '@lesnoypudge/utils-react';
import { ChangeEvent } from 'react';
import { encodeFiles } from './utils';
import { useFileInputContext } from '..';



export const useFileInputOnChange = () => {
    const { getIsMounted } = useIsMounted();
    const {
        value,
        accept,
        amountLimit,
        sizeLimit,
        setValue,
        onAmountLimit,
        onSizeLimit,
        onInvalid,
        onUnacceptableType,
    } = useFileInputContext();

    const onFileChange = useFunction((providedFiles: FileList | null) => {
        if (!providedFiles) return;

        void encodeFiles(Object.values(providedFiles), {
            accept,
            amountLimit,
            sizeLimit,
        }).then((result) => {
            if (!getIsMounted()) return;

            const files = (
                Array.isArray(value)
                    ? value
                    : value
                        ? [value]
                        : []
            );

            const currentFileAmount = files.length;
            const noSpace = currentFileAmount === amountLimit;
            if (noSpace) return onAmountLimit(result.bad);

            const hasAcceptableFiles = !!result.ok.length;
            const filesToSet = result.ok.slice(
                0,
                amountLimit - currentFileAmount,
            );
            if (hasAcceptableFiles) setValue(filesToSet);

            const notEnoughSpace = (
                currentFileAmount + result.ok.length > amountLimit
            );
            if (notEnoughSpace) return onAmountLimit(result.bad);

            const unacceptableType = result.bad.some((file) => {
                return file.reason === 'type';
            });
            if (unacceptableType) return onUnacceptableType(result.bad);

            const invalidFile = result.bad.some((file) => {
                return file.reason === 'invalid';
            });
            if (invalidFile) return onInvalid(result.bad);

            const sizeLimitOverflow = result.bad.some((file) => {
                return file.reason === 'size';
            });
            if (sizeLimitOverflow) return onSizeLimit(result.bad);
        });
    });

    const onChange = useFunction((e: ChangeEvent<HTMLInputElement>) => {
        onFileChange(e.target.files);
    });

    return {
        onFileChange,
        onChange,
    };
};