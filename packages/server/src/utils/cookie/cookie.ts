import { Response } from 'express';
import { TOKEN_NAME } from '@shared';
import { env, isProd } from '@constants';

export const cookie = {
    setAccessToken: (res: Response, token: string) => {
        res.cookie(
            TOKEN_NAME.ACCESS,
            token,
            {
                maxAge: Number.parseInt(env._ACCESS_TOKEN_DURATION),
                httpOnly: false,
                secure: isProd,
            },
        );
    },

    clearAccessToken: (res: Response) => {
        res.clearCookie(TOKEN_NAME.ACCESS);
    },

    setRefreshToken: (res: Response, token: string) => {
        res.cookie(
            TOKEN_NAME.REFRESH,
            token,
            {
                maxAge: Number.parseInt(env._REFRESH_TOKEN_DURATION),
                httpOnly: false,
                secure: isProd,
                // path: Endpoints.V1.User.Refresh.Path,
            },
        );
    },

    clearRefreshToken: (res: Response) => {
        res.cookie(
            TOKEN_NAME.REFRESH,
            '',
            {
                httpOnly: false,
                secure: isProd,
                expires: new Date(0),
                // path: Endpoints.V1.User.Refresh.Path,
            },
        );
    },
};