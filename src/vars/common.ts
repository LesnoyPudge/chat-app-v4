import { env } from './env';



export const isProd = env.PROD;

export const isDev = !isProd;

export const MOBILE_SCREEN_QUERY = '(max-width: 1279px)';

export const WHITESPACE = String.fromCodePoint(160);