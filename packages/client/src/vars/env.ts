import { T } from '@lesnoypudge/types-utils-base/namespace';



export const env = import.meta.env as T.Simplify<ImportMetaEnv & PublicEnv>;