import { createEnv } from './utils/createEnv';



createEnv({
    publicPrefix: '_PUBLIC_',
    envPath: 'packages/shared/generated',
    typePath: 'packages/shared/generated',
    value: {
        _DB_CONNECTION_URL: '',
        _JWT_ACCESS_KEYWORD: '',
        _JWT_REFRESH_KEYWORD: '',
        _SMTP_SERVICE: 'Mail.ru',
        _SMTP_USER: 'qwezxcpochtalyon@mail.ru',
        _SMTP_PASSWORD: '',
        _BCRYPT_SALT_ROUNDS: '10',
        _PUBLIC_CLIENT_PORT: '3000',
        _PUBLIC_SERVER_PORT: '5000',
        _PUBLIC_CLIENT_URL: 'http://localhost:3000',
        _PUBLIC_WS_SERVER: 'ws://localhost:5000',
        _PUBLIC_SERVER_URL: 'http://localhost:5000',
        _PUBLIC_API_V1_URL: '/api/v1',
        _REFRESH_TOKEN_DURATION: '30d',
        _ACCESS_TOKEN_DURATION: '15m',
        _ACCESS_CODE_DURATION: '6h',
        _ACCESS_CODE_SIZE: '6',
    },
});