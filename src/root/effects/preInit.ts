import { isDev } from '@vars';
import { logger } from '@utils';
import { initI18n } from 'src/i18n/i18n.ts';
import { fakeServer, initDB } from '@fakeServer';



export const preInit = async () => {
    logger.log('preInit');

    await Promise.all([
        initI18n(),

        initDB(),

        fakeServer.init(),

        // import('src/i18n/i18n.ts').then((v) => v.init()),

        // import('@fakeServer').then((server) => {
        //     return Promise.all([
        //         server.initDB(),
        //         server.fakeServer.init(),
        //     ]);
        // }),

        (async () => {
            if (isDev) {
                const { scan } = await import('react-scan');

                scan({
                    enabled: false,
                    log: false,
                    animationSpeed: 'off',
                    // alwaysShowLabels: false,
                    showToolbar: false,
                    // trackUnnecessaryRenders: true,s
                    // renderCountThreshold: 1,
                    // smoothlyAnimateOutlines: false,
                });
            }
        })(),
    ]).then(() => {
        logger.log('preInit promises resolved');
    });
};