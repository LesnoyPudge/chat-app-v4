import { localStorageApi, logger } from '@/utils';
import {
    delay,
    DefaultBodyType,
    http,
    HttpResponse,
    StrictRequest,
    StrictResponse,
} from 'msw';
import { db } from '../FakeDB';
import {
    catchErrorAsync,
    HTTP_METHODS,
    HTTP_STATUS_CODES,
    invariant,
    toPromise,
} from '@lesnoypudge/utils';
import { env } from '@/vars';
import { token } from '../token';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { scenarios } from '../Scenarios';
import { socket } from '@/fakeSocket';



export const append = (list: string[], id: string) => {
    return [...new Set([...list, id])];
};

export const _res = HttpResponse;

export const toError = (status: number) => {
    return new _res(null, { status });
};

// const apiError = {
//     badRequest: () => toError(HTTP_STATUS_CODES.BAD_REQUEST),
//     unauthorized: () => toError(HTTP_STATUS_CODES.UNAUTHORIZED),
// };

class ApiError extends Error {
    status: number;

    constructor(status: number) {
        super();
        this.status = status;
    }
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions, @typescript-eslint/no-explicit-any
export function invariantBadRequest(condition: any): asserts condition {
    if (!condition) throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST);
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions, @typescript-eslint/no-explicit-any
function invariantUnauthorized(condition: any): asserts condition {
    if (!condition) throw new ApiError(HTTP_STATUS_CODES.UNAUTHORIZED);
};

export type EndpointObject = {
    Method: T.ValueOf<typeof HTTP_METHODS>;
    Path: string;
};

export type Auth = {
    id: string;
};

type ToRecord<_Value> = (
    _Value extends void
        ? T.AnyRecord
        : _Value
);

export type HandlerReturn<_Response extends DefaultBodyType | void> = (
    _Response extends void
        ? void
        : (
            (StrictResponse<Exclude<_Response, void>> & { _: true })
            | 'unhandled'
            )
    // | ReturnType<T.ValueOf<typeof apiError>>
);

export type Handler<
    _Request extends DefaultBodyType | void,
    _Response extends NonNullable<DefaultBodyType> | void,
> = (props: {
    body: _Request;
    auth: Auth;
    request: StrictRequest<ToRecord<_Request>>;
}) => (
    HandlerReturn<_Response>
    | Promise<HandlerReturn<_Response>>
);

export const jsonResponse = <
    _Response extends NonNullable<DefaultBodyType>,
>(response: _Response): HandlerReturn<_Response> => {
    const result = _res.json(
        response,
    ) as StrictResponse<_Response> & { _: true };

    result._ = true;

    return result as HandlerReturn<_Response>;
};

export const setupScenarioIfNeeded = async (
    myId: string,
    force = false,
) => {
    const setupScenario = localStorageApi.get('setupScenario');

    const isUserRequestedPopulate = setupScenario && setupScenario !== 'none';

    if (force || isUserRequestedPopulate) {
        localStorageApi.set('setupScenario', 'none');

        const variant = (
            (setupScenario && setupScenario !== 'none')
                ? setupScenario
                : 'populateMedium'
        );

        await scenarios.setup({
            myId,
            variant,
        });
    }

    const user = db.getById('user', myId);
    invariant(user, 'user not found');

    return user;
};

export const route = <
    _Request extends DefaultBodyType | void,
    _Response extends NonNullable<DefaultBodyType> | void,
>(endpointObject: EndpointObject) => {
    return (...handlers: Handler<_Request, _Response>[]) => {
        const path = `${env._PUBLIC_SERVER_URL}${endpointObject.Path}`;

        const handle = async (request: StrictRequest<DefaultBodyType>) => {
            try {
                let result: HttpResponse = new _res();

                await delay(1_500);

                const auth = undefined as unknown as Auth;
                const body = await request.json() as _Request;
                const req = request as StrictRequest<ToRecord<_Request>>;
                const props = {
                    body,
                    auth,
                    request: req,
                } as Parameters<Handler<_Request, _Response>>[0];

                for (const [_, handler] of handlers.entries()) {
                    const [
                        handlerResult,
                        error,
                    ] = await catchErrorAsync(() => {
                        return toPromise(handler)(props);
                    });

                    if (handlerResult === 'unhandled') continue;

                    if (error) {
                        logger.fakeServer.error('REQUEST_ERROR', error);

                        if (error instanceof ApiError) {
                            return toError(error.status);
                        }

                        return toError(500);
                    }

                    if (handlerResult) {
                        result = handlerResult;
                    }
                }

                return result;
            } catch {
                return toError(500);
            }
        };

        return http[endpointObject.Method](
            path,
            async ({ request }) => {
                socket.lock();

                const response = await handle(request);

                socket.unlock();
                socket.unignore();

                return response;
            },
        );
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withAuth: Handler<any, any> = (props) => {
    const header = props.request.headers.get('Authorization');
    invariantUnauthorized(header);

    const headerToken = header.replace('Bearer ', '');
    const tokenData = token.validateAccessToken(headerToken);
    invariantUnauthorized(tokenData);

    props.auth = {
        id: tokenData.id,
    };

    return 'unhandled';
};