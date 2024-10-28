import { T } from '@root';



export type ClientAccessibleEnv = Readonly<{
    CUSTOM_NODE_ENV: 'development' | 'production';
    CUSTOM_SERVER_PORT: string;
    CUSTOM_CLIENT_URL: string;
    CUSTOM_SERVER_URL: string;
    CUSTOM_API_V1_URL: '/api/v1';
}>;

export type Env = T.Simplify<ClientAccessibleEnv & Readonly<{
    DB_CONNECTION_URL: string;
    JWT_ACCESS_KEYWORD: string;
    JWT_REFRESH_KEYWORD: string;
    SMTP_SERVICE: string;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
    BCRYPT_SALT_ROUNDS: string;
    REFRESH_TOKEN_DURATION: string;
    ACCESS_TOKEN_DURATION: string;
    ACCESS_CODE_DURATION: string;
    ACCESS_CODE_SIZE: string;
}>>;