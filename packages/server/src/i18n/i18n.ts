import * as i18nextHttp from 'i18next-http-middleware';
import i18next from 'i18next';
import { Express } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { env, isDev } from '@constants';



// type Keyset = Record<string, string>;
// type Namespace = Record<string, Keyset>;
// type Locales = Record<string, Namespace>;

// const localesFolder = path.join(import.meta.dirname, './locales');

// const locales = fs.readdirSync(
//     localesFolder,
// ).filter((fileName) => {
//     const joinedPath = path.join(localesFolder, fileName);
//     return fs.lstatSync(joinedPath).isDirectory();
// });

import * as en from './locales/en';
import * as ru from './locales/ru';

export const resources = {
    en,
    ru,
} as const;

export const defaultNS: keyof typeof ru = 'common';

export { t } from 'i18next';

export const setupI18n = async (app: Express) => {
    // const resources: Locales = {};

    // for (const locale of locales) {
    //     const namespaces = await import(
    //         `./locales/${locale}/index.js`
    //     ) as Namespace;

    //     resources[locale] = {
    //         ...namespaces,
    //     };
    // }

    const namespaces: (keyof typeof ru)[] = ['common'];

    await new Promise<void>((res, rej) => {
        i18next.on('failedLoading', (...props) => rej(props));

        i18next.on('initialized', () => res());

        void (
            i18next
                .use(i18nextHttp.LanguageDetector)
                .init({
                    // debug: isDev,
                    initImmediate: false,
                    defaultNS,
                    ns: namespaces,
                    fallbackLng: env._PUBLIC_DEFAULT_LNG,
                    resources,
                })
        );
    });

    app.use(i18nextHttp.handle(i18next));
};