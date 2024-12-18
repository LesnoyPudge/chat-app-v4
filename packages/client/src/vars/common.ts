import { ClientEntities } from '@types';
import { env } from './env';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { t } from 'i18next';



export const isDev = env.DEV;

export const isProd = !isDev;

export const MOBILE_SCREEN_QUERY = '(max-width: 1279px)';

export const WHITESPACE = String.fromCodePoint(160);

type Names = T.ValueOf<Pick<
    ClientEntities.User.Base,
    'extraStatus' | 'status'
>>;

export const STATUS_LABEL = {
    online: t('STATUS.online'),
    offline: t('STATUS.offline'),
    default: t('STATUS.online'),
    invisible: t('STATUS.offline'),
    afk: t('STATUS.afk'),
    dnd: t('STATUS.dnd'),
} satisfies Record<Names, string>;