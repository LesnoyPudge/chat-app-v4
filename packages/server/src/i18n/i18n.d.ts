import { NamespacesType } from './generated';
import { env } from '@constants';



declare module 'i18next' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface CustomTypeOptions {
        defaultNS: typeof env._PUBLIC_DEFAULT_LNG_NS;
        resources: NamespacesType;
    }
}