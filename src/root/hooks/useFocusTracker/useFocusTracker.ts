import { useEventListener } from '@lesnoypudge/utils-react';
import { logger } from '@/utils';



export const useFocusTracker = () => {
    useEventListener(window, 'blur', (e) => {
        logger.log('blur on:', e.target);
    }, { capture: true });
    useEventListener(window, 'focus', (e) => {
        logger.log('focus on:', e.target);
    }, { capture: true });
};