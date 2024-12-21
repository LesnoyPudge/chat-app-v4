import { sharedValidators } from '@fakeShared';
import { parseJSON } from '@lesnoypudge/utils';
import { ClientEntities } from '@types';
import { env } from '@vars';
import * as v from 'valibot';



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
                env._PUBLIC_JWT_REFRESH_KEYWORD,
                {
                    expiresIn: Number.parseInt(
                        env._PUBLIC_REFRESH_TOKEN_DURATION,
                    ),
                },
            ),
            accessToken: fakeJwt.sign(
                payload,
                env._PUBLIC_JWT_ACCESS_KEYWORD,
                {
                    expiresIn: Number.parseInt(
                        env._PUBLIC_ACCESS_TOKEN_DURATION,
                    ),
                },
            ),
        };
    },

    validateRefreshToken: (refreshToken: string) => {
        return fakeJwt.verify(
            refreshToken,
            env._PUBLIC_JWT_REFRESH_KEYWORD,
        );
    },

    validateAccessToken: (accessToken: string) => {
        return fakeJwt.verify(
            accessToken,
            env._PUBLIC_JWT_ACCESS_KEYWORD,
        );
    },
};