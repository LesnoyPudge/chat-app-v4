import { useEventListener } from '@lesnoypudge/utils-react';
import { logger } from '@utils';



export const useFocusTracker = () => {
    // useEventListener(document, 'focusout', (e) => {
    //     logger.log('blur on', e.relatedTarget);
    // });
    useEventListener(window, 'focusin', (e) => {
        logger.log('focus from', e.relatedTarget);
        logger.log('focus on', e.target);
        // logger.log('focus on', e.target);
    });
};