import { isDev, THIRD_PARTY_LOGS } from '@/vars';
import { logger } from '@/utils';



export const preInit = async () => {
    logger.setup.log('preInit');

    if (isDev) {
        const { scan } = await import('react-scan');

        // @ts-expect-error internal flag for react-scan to skip into logging
        window.hideIntro = !THIRD_PARTY_LOGS.reactScan;

        scan({
            enabled: true,
            showFPS: true,
            trackUnnecessaryRenders: false,
            log: THIRD_PARTY_LOGS.reactScanDeep,
            animationSpeed: 'off',
            showToolbar: true,
            showNotificationCount: true,
        });
    }

    logger.setup.log('preInit end');
};