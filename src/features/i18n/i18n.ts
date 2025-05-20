import type { i18n, TFunction } from 'i18next';
import type { HttpBackendOptions } from 'i18next-http-backend';
import { env, FLAGS, isDev, isDevOrPreview } from '@/vars';
import { namespaces } from '@/generated/i18n';
import { createPromiseLoader } from '@/utils';
import { invariant } from '@lesnoypudge/utils';



const NOT_LOADED = '__NOT_LOADED__';
let resolvedT: TFunction | null = null;
let i18nInstance: i18n;

class LazyString extends String {
    _args: Parameters<TFunction> | undefined = undefined;

    _setArgs(newArgs: Parameters<TFunction>) {
        this._args = newArgs;
    }

    _getValue() {
        invariant(this._args);

        return (resolvedT?.(...this._args) ?? NOT_LOADED);
    }

    toString() {
        return this._getValue().toString();
    }

    valueOf() {
        return this._getValue().valueOf();
    }

    [Symbol.toPrimitive](hint: unknown) {
        if (hint === 'string') {
            return this.toString();
        }

        return this.valueOf();
    }
}

export const t = ((...args: Parameters<TFunction>) => {
    const lazyString = new LazyString(NOT_LOADED);

    lazyString._setArgs(args);

    return lazyString;
});

export type t = typeof t;

export const getI18nInstance = () => {
    return i18nInstance;
};

const {
    abortLoading,
    finishLoading,
    getIsLoaded,
    getIsLoading,
    loader,
    startLoading,
} = createPromiseLoader();

export const initI18n = async () => {
    if (getIsLoaded()) return loader;
    if (getIsLoading()) return loader;

    startLoading();

    try {
        if (!localStorage.getItem('i18nextLng')) {
            localStorage.setItem('i18nextLng', env._PUBLIC_DEFAULT_LNG);
        }

        const supportedLngs = JSON.parse(
            env._PUBLIC_SUPPORTED_LNGS,
        ) as string[];

        const [
            i18n,
            initReactI18next,
            LanguageDetector,
            HttpBackend,
        ] = await Promise.all([
            import('i18next').then((v) => v.default),
            import('react-i18next').then((v) => v.initReactI18next),
            import('i18next-browser-languagedetector').then((v) => v.default),
            import('i18next-http-backend').then((v) => v.default),
        ]);

        const result = (
            await i18n
                .use(HttpBackend)
                .use(LanguageDetector)
                .use(initReactI18next)
                .init<HttpBackendOptions>({
                    debug: FLAGS.GENERAL.DEBUG_I18N,
                    partialBundledLanguages: true,
                    interpolation: {
                        escapeValue: false,
                    },
                    load: 'languageOnly',
                    ns: namespaces,
                    supportedLngs,
                    fallbackLng: env._PUBLIC_DEFAULT_LNG,
                    defaultNS: env._PUBLIC_DEFAULT_LNG_NS,
                    backend: {
                        loadPath: '/locales/{{lng}}/{{ns}}.json',
                    },
                })
        );

        resolvedT = result;
        i18nInstance = i18n;

        if (isDevOrPreview) {
            await i18n.changeLanguage(env._PUBLIC_DEFAULT_LNG);
        }

        if (isDev) {
            const translationCheck = await import('translation-check');
            i18n.use(translationCheck.i18nextPlugin);

            // translationCheck.showTranslations(i18n);
        }
    } catch (error) {
        abortLoading();
        throw error;
    }

    finishLoading();
};