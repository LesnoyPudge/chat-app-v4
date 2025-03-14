import { isProd } from '@/vars';
import { logger, promiseTimeout } from '@/utils';
import { initI18n } from '@/features';
import { fakeServer, initDB } from '@/fakeServer';



const TIMEOUT = 15_000;

const reactScanInit = async () => {
    if (isProd) return;

    const { scan } = await import('react-scan');

    scan({
        enabled: true,
        showFPS: true,
        trackUnnecessaryRenders: false,
        log: false,
        animationSpeed: 'off',
        // alwaysShowLabels: false,
        showToolbar: true,
        // trackUnnecessaryRenders: true,s
        // renderCountThreshold: 1,
        // smoothlyAnimateOutlines: false,
    });
};

export const preInit = async () => {
    logger.log('preInit');

    const i18nPromise = initI18n();
    const dbPromise = initDB();
    const fakeServerPromise = fakeServer.init();
    const reactScanPromise = reactScanInit();

    await Promise.all([
        promiseTimeout(i18nPromise, TIMEOUT),
        promiseTimeout(dbPromise, TIMEOUT),
        promiseTimeout(fakeServerPromise, TIMEOUT),
        promiseTimeout(reactScanPromise, TIMEOUT),
    ]);

    logger.log('preInit end');
};