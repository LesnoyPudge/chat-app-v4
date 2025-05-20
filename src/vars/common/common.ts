import { env } from '../env';



export const isProd = env.PROD;

export const isDev = !isProd;

export const isDevOrPreview = isProd || isDev;

export const MOBILE_SCREEN_QUERY = '(max-width: 1279px)';

export const WHITESPACE = String.fromCodePoint(160);

export const ACCEPTED_FILE_TYPE = {
    ALL: '*',
    IMAGES: 'image/jpeg, image/png, image/webp',
} as const;

export const SOCIAL_LINKS = {
    TWITTER: 'https://twitter.com/discord',
    FACEBOOK: 'https://www.facebook.com/discord',
    INSTAGRAM: 'https://www.instagram.com/discord',
};