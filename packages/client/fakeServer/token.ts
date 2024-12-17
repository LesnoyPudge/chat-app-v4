import { sharedValidators } from '@fakeShared';
import { parseJSON } from '@lesnoypudge/utils';
import { ClientEntities } from '@types';
import * as v from 'valibot';



const JWT_ACCESS_KEYWORD = 'accessSecret';
const JWT_REFRESH_KEYWORD = 'refreshSecret';
const REFRESH_TOKEN_DURATION = 30 * 24 * 60 * 60 * 1_000; // 30 days
const ACCESS_TOKEN_DURATION = 15 * 60 * 1_000; // 15 min

const jwtSchema = v.object({
    payload: v.object({
        id: sharedValidators.id,
        password: sharedValidators.commonString,
    }),
    secret: sharedValidators.commonString,
    options: v.object({
        expiresAt: v.number(),
    }),
});

const fakeJwt = {
    sign: (
        payload: ClientEntities.User.TokenData,
        secret: string,
        options: { expiresIn: number },
    ) => {
        return JSON.stringify({
            payload,
            secret,
            options: {
                expiresAt: Date.now() + options.expiresIn,
            },
        });
    },

    verify: (
        token: string,
        secret: string,
    ): ClientEntities.User.TokenData | null => {
        const parsed = parseJSON(token);
        const validated = v.safeParse(jwtSchema, parsed);
        if (!validated.success) return null;

        const { output } = validated;

        if (output.secret !== secret) return null;
        if (output.options.expiresAt >= Date.now()) return null;

        return output.payload;
    },
};

export const token = {
    generateTokens: (payload: ClientEntities.User.TokenData) => {
        return {
            refreshToken: fakeJwt.sign(
                payload,
                JWT_REFRESH_KEYWORD,
                { expiresIn: REFRESH_TOKEN_DURATION },
            ),
            accessToken: fakeJwt.sign(
                payload,
                JWT_ACCESS_KEYWORD,
                { expiresIn: ACCESS_TOKEN_DURATION },
            ),
        };
    },

    validateRefreshToken: (refreshToken: string) => {
        return fakeJwt.verify(
            refreshToken,
            JWT_REFRESH_KEYWORD,
        );
    },

    validateAccessToken: (accessToken: string) => {
        return fakeJwt.verify(
            accessToken,
            JWT_ACCESS_KEYWORD,
        );
    },
};