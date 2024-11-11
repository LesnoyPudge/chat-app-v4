import { T } from '@lesnoypudge/types-utils-base/namespace';
import { STATUS_CODE } from '@lesnoypudge/utils';



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

    static badRequest(message = 'Неверный запрос') {
        return new ApiError(STATUS_CODE.BAD_REQUEST, message);
    }

    static unauthorized(message = 'Не авторизован') {
        return new ApiError(STATUS_CODE.UNAUTHORIZED, message);
    }

    static notFound(message = 'Не найдено') {
        return new ApiError(STATUS_CODE.NOT_FOUND, message);
    }

    static internal(message = 'Непредвиденная ошибка') {
        return new ApiError(STATUS_CODE.INTERNAL_SERVER_ERROR, message);
    }
}