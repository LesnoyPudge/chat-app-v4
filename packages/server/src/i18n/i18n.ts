import * as i18nextHttp from 'i18next-http-middleware';
import i18next from 'i18next';
import { env } from '@constants';
import { resources, namespaces } from './generated';
import { App } from '@types';



export const setupI18n = async (app: App) => {
    await new Promise<void>((res, rej) => {
        i18next.on('failedLoading', (...props) => rej(props));

        i18next.on('initialized', () => res());

        void (
            i18next
                .use(i18nextHttp.LanguageDetector)
                .init({
                    // debug: true,
                    supportedLngs: JSON.parse(
                        env._PUBLIC_SUPPORTED_LNGS,
                    ) as string[],
                    initImmediate: false,
                    defaultNS: env._PUBLIC_DEFAULT_LNG_NS,
                    ns: namespaces,
                    fallbackLng: env._PUBLIC_DEFAULT_LNG,
                    resources,
                })
        );
    });

    app.use(i18nextHttp.handle(i18next));
};