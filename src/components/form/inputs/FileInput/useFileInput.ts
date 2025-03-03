import { ClientEntities } from '@/types';
import { encodeFiles } from './encodeFiles';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { FileInputPure } from './FileInput';
import { useFunction, useIsMounted } from '@lesnoypudge/utils-react';



export namespace useFileInput {
    type Listener = (badFiles: ClientEntities.File.Invalid[]) => void;

    export type Props = T.Simplify<(
        encodeFiles.Options
        & {
            files: ClientEntities.File.Encoded[];
            setFiles: (files: ClientEntities.File.Encoded[]) => void;
            onAmountLimit: Listener;
            onSizeLimit: Listener;
            onUnacceptableType: Listener;
            onInvalid: Listener;
        }
    )>;

    export type onChange = FileInputPure.Props['onChange'];

    export type Return = {
        onChange: onChange;
    };
}

export const useFileInput = ({
    accept,
    amountLimit,
    sizeLimit,
    files,
    setFiles,
    onAmountLimit,
    onInvalid,
    onSizeLimit,
    onUnacceptableType,
}: useFileInput.Props): useFileInput.Return => {
    const { getIsMounted } = useIsMounted();

    const onChange: useFileInput.onChange = useFunction((e) => {
        const providedFiles = e.target.files;
        if (!providedFiles?.length) return;

        void encodeFiles(Object.values(providedFiles), {
            accept,
            amountLimit,
            sizeLimit,
        }).then((result) => {
            if (!getIsMounted()) return;

            const currentFileAmount = files.length;
            const noSpace = currentFileAmount === amountLimit;
            if (noSpace) return onAmountLimit(result.bad);

            const hasAcceptableFiles = !!result.ok.length;
            const filesToSet = result.ok.slice(
                0,
                amountLimit - currentFileAmount,
            );
            if (hasAcceptableFiles) setFiles(filesToSet);

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

    return {
        onChange,
    };
};