/* eslint-disable react-hooks/rules-of-hooks */

import { getAppElementCount, logger } from '@/utils';
import { toOneLine } from '@lesnoypudge/utils';
import { useInterval } from '@lesnoypudge/utils-react';
import { useFocusTracker } from './hooks';
import { FLAGS } from '@/vars';



// while in dev mode, runs various checks
// for early catch of bug or performance slowdowns
export const useDebug = () => {
    const checks = {
        checkElementCount: () => {
            if (!FLAGS.GENERAL.ENABLE_ELEMENT_COUNT) return;

            const MAX = 1_000;
            const currentCount = getAppElementCount();

            if (currentCount >= MAX) {
                logger._warns.warn(toOneLine(`
                    Found ${currentCount} elements on page.
                    Maximum allowed is ${MAX}.    
                `));
            }
        },
    };

    useInterval(() => {
        Object.values(checks).forEach((check) => check());
    }, 500);

    if (FLAGS.GENERAL.ENABLE_FOCUS_TRACKER) {
        useFocusTracker();
    }
};