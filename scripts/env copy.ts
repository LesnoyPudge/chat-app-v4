import ms from 'ms';
import { createEnv } from './utils/createEnv';



class PrivateEnv {
    _DB_LOGIN = 'postgres';
    _DB_PASSWORD = 'pass';
    DATABASE_URL = ''.concat(
        'postgresql://',
        this._DB_LOGIN,
        ':',
        this._DB_PASSWORD,
        '@localhost:5432/chatapp?schema=public',
    );

    _JWT_ACCESS_KEYWORD = '';
    _JWT_REFRESH_KEYWORD = '';
    _SMTP_SERVICE = 'Mail.ru';
    _SMTP_USER = 'qwezxcpochtalyon@mail.ru';
    _SMTP_PASSWORD = '';
    _BCRYPT_SALT_ROUNDS = '10';
    _REFRESH_TOKEN_DURATION = String(ms('30d'));
    _ACCESS_TOKEN_DURATION = String(ms('15m'));
    _ACCESS_CODE_DURATION = String(ms('6h'));
}

class PublicEnv {
    _PUBLIC_APP_NAME = 'ChatApp';
    _PUBLIC_ACCESS_CODE_SIZE = '6';
    _PUBLIC_API_V1 = '/api/v1';
    _PUBLIC_PROTOCOL = 'http';
    _PUBLIC_URL_HOSTNAME = 'localhost';
    _PUBLIC_CLIENT_PORT = '3000';
    _PUBLIC_SERVER_PORT = '5000';
    _PUBLIC_WS_PROTOCOL = 'ws';
    _PUBLIC_WS_HOSTNAME = this._PUBLIC_URL_HOSTNAME;
    _PUBLIC_WS_PORT = this._PUBLIC_SERVER_PORT;
    _PUBLIC_CLIENT_URL = ''.concat(
        this._PUBLIC_PROTOCOL,
        '://',
        this._PUBLIC_URL_HOSTNAME,
        ':',
        this._PUBLIC_CLIENT_PORT,
    );

    _PUBLIC_SERVER_URL = ''.concat(
        this._PUBLIC_PROTOCOL,
        '://',
        this._PUBLIC_URL_HOSTNAME,
        ':',
        this._PUBLIC_SERVER_PORT,
    );

    _PUBLIC_WS_SERVER = ''.concat(
        this._PUBLIC_WS_PROTOCOL,
        '://',
        this._PUBLIC_WS_HOSTNAME,
        ':',
        this._PUBLIC_WS_PORT,
    );

    _PUBLIC_SERVER_API_V1_URL = ''.concat(
        this._PUBLIC_SERVER_URL,
        this._PUBLIC_API_V1,
    );

    _PUBLIC_DEFAULT_LNG_NS = 'common';
    _PUBLIC_SUPPORTED_LNGS = JSON.stringify([
        'ru',
        'en',
    ]);

    _PUBLIC_DEFAULT_LNG = JSON.stringify(
        (JSON.parse(
            this._PUBLIC_SUPPORTED_LNGS,
        ) as string[])[0],
    );
}

createEnv({
    publicPrefix: '_PUBLIC_',
    envPath: 'packages/shared/generated',
    typePath: 'packages/shared/generated',
    value: {
        ...new PrivateEnv(),
        ...new PublicEnv(),
    },
});