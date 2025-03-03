import i18n, { TFunction } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { env, isDev } from '@/vars';
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend';
import { namespaces } from '@/generated/i18n';



let resolvedT: TFunction | null = null;

export let t = ((...args) => {
    return {
        toString: () => {
            return resolvedT?.(...args) ?? '__NOT_LOADED__';
        },
    };
}) as TFunction;

const promise = (i18n
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
).then((result) => {
    resolvedT = result;
    t = result;

    return result;
});

export const initI18n = async () => {
    await promise;

    // const result = await (i18n
    //     .use(HttpBackend)
    //     .use(LanguageDetector)
    //     .use(initReactI18next)
    //     .init<HttpBackendOptions>({
    //         // debug: true,
    //         partialBundledLanguages: true,
    //         interpolation: {
    //             escapeValue: false,
    //         },
    //         load: 'languageOnly',
    //         ns: namespaces,
    //         supportedLngs: JSON.parse(env._PUBLIC_SUPPORTED_LNGS) as string[],
    //         fallbackLng: env._PUBLIC_DEFAULT_LNG,
    //         defaultNS: env._PUBLIC_DEFAULT_LNG_NS,
    //         backend: {
    //             loadPath: '/locales/{{lng}}/{{ns}}.json',
    //         },
    //     })
    // );

    // resolvedT = result;
    // t = result;
};

if (isDev) {
    await i18n.changeLanguage(env._PUBLIC_DEFAULT_LNG);

    const translationCheck = await import('translation-check');
    i18n.use(translationCheck.i18nextPlugin);

    // translationCheck.showTranslations(i18n);
}