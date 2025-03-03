/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { NamespacesType } from '@/generated/i18n';
import { env } from '@/vars';



declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: typeof env._PUBLIC_DEFAULT_LNG_NS;
        resources: NamespacesType;
    }
}