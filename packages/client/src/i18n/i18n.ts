import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { env, isDev } from '@vars';
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend';
import { namespaces } from '@generated/i18n';



export const i18nInit = async () => {
    await (i18n
        .use(HttpBackend)
        .use(LanguageDetector)
        .use(initReactI18next)
        .init<HttpBackendOptions>({
            // debug: true,
            partialBundledLanguages: true,
            interpolation: {
                escapeValue: false,
            },
            load: 'languageOnly',
            ns: namespaces,
            supportedLngs: JSON.parse(env._PUBLIC_SUPPORTED_LNGS) as string[],
            fallbackLng: env._PUBLIC_DEFAULT_LNG,
            defaultNS: env._PUBLIC_DEFAULT_LNG_NS,
            backend: {
                loadPath: '/locales/{{lng}}/{{ns}}.json',
            },
        })
    );

    if (isDev) {
        await i18n.changeLanguage(env._PUBLIC_DEFAULT_LNG);
    }
};