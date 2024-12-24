import { T } from '@lesnoypudge/types-utils-base/namespace';



export const env = import.meta.env as T.Simplify<
    Pick<
        ImportMetaEnv,
        'BASE_URL'
        | 'MODE'
        | 'DEV'
        | 'PROD'
        | 'SSR'
    >
    & PublicEnv
>;