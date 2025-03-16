import { isDev } from '@/vars';
import { logger, promiseTimeout } from '@/utils';
import { initI18n } from '@/features';
import { fakeServer, initDB } from '@/fakeServer';



const TIMEOUT = 15_000;

export const preInit = async () => {
    logger.log('preInit');

    if (isDev) {
        const { scan } = await import('react-scan');

        scan({
            enabled: true,
            showFPS: true,
            trackUnnecessaryRenders: false,
            log: false,
            animationSpeed: 'off',
            showToolbar: true,
        });
    }

    const i18nPromise = initI18n();
    const dbPromise = initDB();
    const fakeServerPromise = fakeServer.init();

    // if there is bug in initialization (fakeServer) we
    // throw error after specified timeout to prevent
    // infinite promise
    await Promise.all([
        promiseTimeout(i18nPromise, TIMEOUT),
        promiseTimeout(dbPromise, TIMEOUT),
        promiseTimeout(fakeServerPromise, TIMEOUT),
    ]);

    logger.log('preInit end');
};