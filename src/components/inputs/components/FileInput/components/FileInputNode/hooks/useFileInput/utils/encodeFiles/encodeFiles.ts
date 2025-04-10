import { ClientEntities } from '@/types';
import { catchErrorAsync } from '@lesnoypudge/utils';
import { FileInputTypes } from '../../../../../../types';
import { ACCEPTED_FILE_TYPE } from '@/vars';



const toBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener('load', () => {
            if (!reader.result) return reject();

            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            resolve(reader.result.toString());
        });

        reader.addEventListener('error', reject);
    });
};

export namespace encodeFiles {
    export type Result = {
        ok: ClientEntities.File.Encoded[];
        bad: ClientEntities.File.Invalid[];
    };

    export type Options = Pick<
        FileInputTypes.Context,
        'accept' | 'amountLimit' | 'sizeLimit'
    >;
}

export const encodeFiles = async (
    files: File[],
    options: encodeFiles.Options,
): Promise<encodeFiles.Result> => {
    const result: encodeFiles.Result = {
        ok: [],
        bad: [],
    };

    await Promise.all(files.map(async (file) => {
        const isInLimit = file.size <= options.sizeLimit;

        const isTypeAcceptable = (
            options.accept === ACCEPTED_FILE_TYPE.ALL
                ? true
                : options.accept
                        .replaceAll(',', '')
                        .split(' ')
                        .includes(file.type)
        );

        const isBad = !isTypeAcceptable || !isInLimit;

        const okLimitReached = result.ok.length >= options.amountLimit;
        const badLimitReached = result.bad.length >= options.amountLimit;

        if (isBad && !badLimitReached) {
            result.bad.push({
                reason: isTypeAcceptable ? 'size' : 'type',
                name: file.name,
                size: file.size,
                type: file.type,
            });
            return;
        }

        if (isBad) return;
        if (okLimitReached) return;

        const [base64, error] = await catchErrorAsync(() => toBase64(file));

        if (error && !badLimitReached) {
            result.bad.push({
                reason: 'invalid',
                name: file.name,
                size: file.size,
                type: file.type,
            });
            return;
        }

        if (error) return;

        result.ok.push({
            name: file.name,
            size: file.size,
            type: file.type,
            base64,
        });
    }));

    return result;
};