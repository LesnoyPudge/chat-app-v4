import { useFunction, useIsMounted } from '@lesnoypudge/utils-react';
import { ChangeEvent } from 'react';
import { encodeFiles } from './utils';
import { useFileInputContext } from '../useFileInputContext';
import { ClientEntities } from '@/types';



export const useFileInputOnChange = () => {
    const { getIsMounted } = useIsMounted();
    const {
        value,
        accept,
        amountLimit: amountLimitUntyped,
        sizeLimit,
        setValue,
        onAmountLimit,
        onSizeLimit,
        onInvalid,
        onUnacceptableType,
    } = useFileInputContext();

    const derive = (newFiles: encodeFiles.Result) => {
        const amountLimit = amountLimitUntyped as number;
        const isMultipleAllowed = amountLimit > 1;
        const isSingleAllowed = !isMultipleAllowed;
        const currentFiles = (
            Array.isArray(value)
                ? value
                : value
                    ? [value]
                    : []
        );
        const currentFileAmount = currentFiles.length;
        const newFilesAmount = newFiles.ok.length;


        let filesToSet: ClientEntities.File.Encoded[];
        let ok = false;
        let notEnoughSpace = false;

        if (isSingleAllowed) {
            ok = newFilesAmount > 0;
            notEnoughSpace = false;

            const firstFile = newFiles.ok[0];
            filesToSet = [firstFile].filter(Boolean);
        } else {
            const isThereAnySpace = currentFileAmount < amountLimit;
            const isThereOkFiles = newFilesAmount > 0;

            ok = isThereAnySpace && isThereOkFiles;

            notEnoughSpace = (
                (isThereOkFiles && (currentFileAmount === amountLimit))
                || ((currentFileAmount + newFilesAmount) > amountLimit)
            );

            filesToSet = newFiles.ok.slice(
                0,
                amountLimit - currentFileAmount,
            ).filter(Boolean);
        }

        const unacceptableType = newFiles.bad.some((file) => {
            return file.reason === 'type';
        });

        const invalidFile = newFiles.bad.some((file) => {
            return file.reason === 'invalid';
        });

        const sizeLimitOverflow = newFiles.bad.some((file) => {
            return file.reason === 'size';
        });

        return {
            filesToSet,
            ok,
            notEnoughSpace,
            unacceptableType,
            invalidFile,
            sizeLimitOverflow,
        };
    };

    const onFileChange = useFunction((providedFiles: FileList) => {
        if (!providedFiles.length) return;

        void encodeFiles(Object.values(providedFiles), {
            accept,
            amountLimit: amountLimitUntyped,
            sizeLimit,
        }).then((newFiles) => {
            if (!getIsMounted()) return;

            const {
                filesToSet,
                invalidFile,
                notEnoughSpace,
                ok,
                sizeLimitOverflow,
                unacceptableType,
            } = derive(newFiles);

            if (ok) setValue(filesToSet);

            if (notEnoughSpace) return onAmountLimit(newFiles.bad);

            if (unacceptableType) return onUnacceptableType(newFiles.bad);

            if (invalidFile) return onInvalid(newFiles.bad);

            if (sizeLimitOverflow) return onSizeLimit(newFiles.bad);
        });
    });

    const onChange = useFunction((e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        onFileChange(files);
    });

    return {
        onFileChange,
        onChange,
    };
};