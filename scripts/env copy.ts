import { createEnv } from "./utils/createEnv";


createEnv({
    publicPrefix: 'PUBLIC_',
    envPath: '.',
    typePath: '.',
    obj: {
        DB_CONNECTION_URL: '',
        JWT_ACCESS_KEYWORD: '',
        JWT_REFRESH_KEYWORD: '',
        SMTP_SERVICE: 'Mail.ru',
        SMTP_USER: 'qwezxcpochtalyon@mail.ru',
        SMTP_PASSWORD: '',
        BCRYPT_SALT_ROUNDS: '10',
        PUBLIC_CLIENT_PORT: '3000',
        PUBLIC_SERVER_PORT: '5000',
        PUBLIC_CLIENT_URL: 'http://localhost:3000',
        PUBLIC_WS_SERVER: 'ws://localhost:5000',
        PUBLIC_SERVER_URL: 'http://localhost:5000',
        PUBLIC_API_V1_URL: '/api/v1',
        REFRESH_TOKEN_DURATION: '30d',
        ACCESS_TOKEN_DURATION: '15m',
        ACCESS_CODE_DURATION: '6h',
        ACCESS_CODE_SIZE: '6',
    }
})