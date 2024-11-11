import { env } from './env';



export const isDev = env.NODE_ENV === 'development';

export const isProd = !isDev;