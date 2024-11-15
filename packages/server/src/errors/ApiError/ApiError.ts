import { T } from '@lesnoypudge/types-utils-base/namespace';
import { STATUS_CODE } from '@lesnoypudge/utils';
import { t } from 'i18next';



export class ApiError extends Error {
    status: number;

    constructor(
        status: T.ValueOf<typeof STATUS_CODE>,
        message: string,
    ) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }

    static badRequest(message = t('apiError.badRequest')) {
        return new ApiError(STATUS_CODE.BAD_REQUEST, message);
    }

    static unauthorized(message = t('apiError.unauthorized')) {
        return new ApiError(STATUS_CODE.UNAUTHORIZED, message);
    }

    static notFound(message = t('apiError.notFound')) {
        return new ApiError(STATUS_CODE.NOT_FOUND, message);
    }

    static internal(message = t('apiError.internal')) {
        return new ApiError(STATUS_CODE.INTERNAL_SERVER_ERROR, message);
    }
}