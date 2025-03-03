/* eslint-disable @/typescript-eslint/no-misused-spread */
import { createEnv } from './utils/createEnv';
import { hoursToMilliseconds, minutesToMilliseconds } from 'date-fns';



class PublicEnv {
    _PUBLIC_SAFE_ENV_PREFIX = '_PUBLIC';
    _PUBLIC_APP_NAME = 'ChatApp';
    _PUBLIC_AUTHOR_NAME = 'LesnoyPudge';
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
    _PUBLIC_DEFAULT_LNG = 'ru';
    _PUBLIC_SUPPORTED_LNGS = JSON.stringify([
        this._PUBLIC_DEFAULT_LNG,
        'en',
    ]);

    _PUBLIC_REFRESH_TOKEN_DURATION = String(hoursToMilliseconds(24) * 30);
    _PUBLIC_ACCESS_TOKEN_DURATION = String(minutesToMilliseconds(15));
    _PUBLIC_ACCESS_CODE_DURATION = String(hoursToMilliseconds(6));
    _PUBLIC_JWT_ACCESS_KEYWORD = 'accessSecret';
    _PUBLIC_JWT_REFRESH_KEYWORD = 'refreshSecret';
}

createEnv({
    publicPrefix: new PublicEnv()._PUBLIC_SAFE_ENV_PREFIX,
    envPath: 'generated',
    typePath: 'generated',
    value: { ...new PublicEnv() },
});