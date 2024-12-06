import { env } from './env';



export const isDev = env.DEV;

export const isProd = !isDev;

export const MOBILE_SCREEN_QUERY = '(max-width: 1279px)';