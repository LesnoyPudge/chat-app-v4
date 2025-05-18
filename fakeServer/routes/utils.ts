import { localStorageApi } from '@/utils';
import {
    delay,
    DefaultBodyType,
    http,
    HttpResponse,
    StrictRequest,
    StrictResponse,
} from 'msw';
import { db } from '../FakeDB';
import { HTTP_METHODS, HTTP_STATUS_CODES, invariant } from '@lesnoypudge/utils';
import { env } from '@/vars';
import { token } from '../token';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { scenarios } from '../Scenarios';



export const _res = HttpResponse;

export const toError = (status: number) => {
    return new _res(null, { status });
};

export const apiError = {
    badRequest: () => toError(HTTP_STATUS_CODES.BAD_REQUEST),
    unauthorized: () => toError(HTTP_STATUS_CODES.UNAUTHORIZED),
};

export type EndpointObject = {
    Method: T.ValueOf<typeof HTTP_METHODS>;
    Path: string;
};

export type Auth = {
    id: string;
};

export type HandlerReturn<_Response extends DefaultBodyType> = (
    (StrictResponse<_Response> & { _: true })
    | 'unhandled'
    | ReturnType<T.ValueOf<typeof apiError>>
);

export type Handler<
    _Request extends DefaultBodyType,
    _Response extends NonNullable<DefaultBodyType>,
> = (props: {
    body: _Request;
    auth: Auth;
    request: StrictRequest<_Request>;
}) => HandlerReturn<_Response> | Promise<HandlerReturn<_Response>>;

export const jsonResponse = <
    _Response extends NonNullable<DefaultBodyType>,
>(response: _Response): HandlerReturn<_Response> => {
    const result = _res.json(
        response,
    ) as StrictResponse<_Response> & { _: true };

    result._ = true;

    return result;
};


export const setupScenarioIfNeeded = async (myId: string) => {
    const setupScenario = localStorageApi.get('setupScenario');

    if (setupScenario && setupScenario !== 'none') {
        localStorageApi.set('setupScenario', 'none');

        await scenarios.setup({
            myId,
            variant: setupScenario,
        });
    }

    const user = db.getById('user', myId);
    invariant(user, 'user not found');

    return user;
};

export const route = <
    _Request extends DefaultBodyType,
    _Response extends NonNullable<DefaultBodyType>,
>(endpointObject: EndpointObject) => {
    return (...handlers: Handler<_Request, _Response>[]) => {
        const path = `${env._PUBLIC_SERVER_URL}${endpointObject.Path}`;

        return http[endpointObject.Method](
            path,
            async ({ request }) => {
                let result: HttpResponse = new _res();

                await delay(1_500);

                const auth = undefined as unknown as Auth;
                const body = await request.json() as _Request;
                const req = request as StrictRequest<_Request>;
                const props = {
                    body,
                    auth,
                    request: req,
                } as Parameters<Handler<_Request, _Response>>[0];

                for (const [_, handler] of handlers.entries()) {
                    const handlerResult = await handler(props);

                    if (handlerResult === 'unhandled') continue;

                    if (typeof handlerResult === 'number') {
                        return new _res(null, { status: handlerResult });
                    }

                    result = handlerResult;
                }


                return result;
            },
        );
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withAuth: Handler<any, any> = (props) => {
    const header = props.request.headers.get('Authorization');
    if (!header) {
        return apiError.unauthorized();
    }
    const headerToken = header.replace('Bearer ', '');
    const tokenData = token.validateAccessToken(headerToken);
    if (!tokenData) {
        return apiError.unauthorized();
    }

    props.auth = {
        id: tokenData.id,
    };

    return 'unhandled';
};