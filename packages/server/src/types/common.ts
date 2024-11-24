import type { PrismaClient } from '@prisma/client/index-browser';
import type http from 'node:http';
import type https from 'node:https';
import type {
    Server as _SocketServer,
    DefaultEventsMap,
} from 'socket.io';
import type * as Ex from 'express';
import { Send } from 'express-serve-static-core';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { TOKEN_NAME, Entity } from '@shared';



export type Server = (
    ReturnType<typeof http.createServer>
    | ReturnType<typeof https.createServer>
);

export type SocketServer = _SocketServer<
    DefaultEventsMap,
    DefaultEventsMap
>;

export type App = Ex.Express;

export type DB = PrismaClient;

type WithAuthorization = {
    cookies: {
        [TOKEN_NAME.ACCESS]: string;
        [TOKEN_NAME.REFRESH]?: string;
    };
    auth: {
        id: Entity.User.Id;
        [TOKEN_NAME.ACCESS]: string;
        [TOKEN_NAME.REFRESH]?: string;
    };
};

export type Request<
    RequestBody,
> = (
    {
        body: RequestBody;
        params: Record<string, unknown>;
    }
    & Partial<WithAuthorization>
);

export type AuthorizedRequest<RequestBody> = (
    Required<WithAuthorization>
    & Request<RequestBody>
);

type BasicResponseBody = (
    T.UnknownRecord
    | T.UnknownArray
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    | void
);

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface Response<
    ResponseBody extends BasicResponseBody,
> extends Ex.Response {
    json: Send<ResponseBody, this>;
}

export type Middleware<
    RequestBody = unknown,
    ResponseBody extends BasicResponseBody = void,
> = (
    req: Ex.Request<RequestBody>,
    res: Response<ResponseBody>,
    next: Ex.NextFunction,
) => void;

export type AuthorizedMiddleware<
    RequestBody = unknown,
    ResponseBody extends BasicResponseBody = void,
> = (
    req: AuthorizedRequest<RequestBody>,
    res: Response<ResponseBody>,
    next: Ex.NextFunction,
) => void;

export type TokenData = Pick<
    Entity.User.Model,
    'id'
    | 'login'
    | 'password'
>;