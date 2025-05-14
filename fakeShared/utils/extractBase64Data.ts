import { ClientEntities } from '@/types';



export const extractBase64Data = (
    fileOrData: ClientEntities.File.Encoded | string,
) => {
    const base64 = (
        typeof fileOrData === 'string'
            ? fileOrData
            : fileOrData.base64
    );

    return base64.split(';base64,')[1];
};