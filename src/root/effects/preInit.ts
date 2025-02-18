import { isDev } from '@vars';
import { logger } from '@utils';



export const preInit = async () => {
    logger.log('preInit');

    await Promise.all([
        import('src/i18n/i18n.ts'),

        import('@fakeServer').then(({ fakeServer }) => fakeServer.init()),

        (async () => {
            if (isDev) {
                const { scan } = await import('react-scan');

                scan({
                    enabled: true,
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