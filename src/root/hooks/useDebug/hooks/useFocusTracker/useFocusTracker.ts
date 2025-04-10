import { useEventListener } from '@lesnoypudge/utils-react';
import { logger } from '@/utils';



export const useFocusTracker = () => {
    useEventListener(window, 'blur', (e) => {
        logger._common.log('blur on:', e.target);
    }, { capture: true });

    useEventListener(window, 'focusin', (e) => {
        logger._common.log('focus on:', e.target);
    }, { capture: true });
};