import { env } from './env';



export const isDev = env.DEV;

export const isProd = !isDev;