import ms from 'ms';
import { createEnv } from './utils/createEnv';



class PrivateEnv {
    _DB_LOGIN = '';
    _DB_PASSWORD = '';
    _DB_CONNECTION_URL = ''.concat(
        'mongodb+srv://',
        this._DB_LOGIN,
        ':',
        this._DB_PASSWORD,
        '@cluster0.gkkfpo5.mongodb.net/?retryWrites=true',
        '&w=majority&appName=Cluster0',
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
    _PUBLIC_DEFAULT_LNG = 'en';
    _PUBLIC_ACCESS_CODE_SIZE = '6';
    _PUBLIC_API_V1 = '/api/v1';
    _PUBLIC_PROTOCOL = 'http';
    _PUBLIC_URL_BASENAME = 'localhost';
    _PUBLIC_CLIENT_PORT = '3000';
    _PUBLIC_SERVER_PORT = '5000';
    _PUBLIC_WS_PROTOCOL = 'ws';
    _PUBLIC_WS_BASENAME = this._PUBLIC_URL_BASENAME;
    _PUBLIC_WS_PORT = this._PUBLIC_SERVER_PORT;
    _PUBLIC_CLIENT_URL = ''.concat(
        this._PUBLIC_PROTOCOL,
        '://',
        this._PUBLIC_URL_BASENAME,
        ':',
        this._PUBLIC_CLIENT_PORT,
    );

    _PUBLIC_SERVER_URL = ''.concat(
        this._PUBLIC_PROTOCOL,
        '://',
        this._PUBLIC_URL_BASENAME,
        ':',
        this._PUBLIC_SERVER_PORT,
    );

    _PUBLIC_WS_SERVER = ''.concat(
        this._PUBLIC_WS_PROTOCOL,
        '://',
        this._PUBLIC_WS_BASENAME,
        ':',
        this._PUBLIC_WS_PORT,
    );

    _PUBLIC_SERVER_API_V1_URL = ''.concat(
        this._PUBLIC_SERVER_URL,
        this._PUBLIC_API_V1,
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