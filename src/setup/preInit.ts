import { isProd } from '@vars';
import { logger } from '@utils';
import { initI18n } from '@features';
import { fakeServer, initDB } from '@fakeServer';



export const preInit = async () => {
    logger.log('preInit');

    await Promise.all([
        initI18n(),

        initDB(),

        fakeServer.init(),

        (async () => {
            if (isProd) return;

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
        })(),
    ]).then(() => {
        logger.log('preInit resolved');
    }).catch((e) => {
        logger.log('preInit rejected', e);
    });

    logger.log('preInit end');
};