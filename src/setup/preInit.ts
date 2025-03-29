import { isDev } from '@/vars';
import { logger } from '@/utils';



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

    logger.log('preInit end');
};