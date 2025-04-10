/* eslint-disable react-hooks/rules-of-hooks */

import { logger } from '@/utils';
import { invariant, toOneLine } from '@lesnoypudge/utils';
import { useAnimationFrame } from '@lesnoypudge/utils-react';
import { useFocusTracker } from './hooks';
import { FLAGS } from '@/vars';



// while in dev mode, runs various checks
// for early catch of bug or performance slowdowns
export const useDebug = () => {
    const checks = {
        checkElementCount: () => {
            const MAX = 1_000;
            const currentCount = document.querySelectorAll('*')?.length;
            invariant(typeof currentCount === 'number');

            if (currentCount >= MAX) {
                logger._warns.warn(toOneLine(`
                    Found ${currentCount} elements on page.
                    Maximum allowed is ${MAX}.    
                `));
            }
        },
    };

    useAnimationFrame(() => {
        Object.values(checks).forEach((check) => check());
    }, FLAGS.GENERAL.ENABLE_ELEMENT_COUNT);

    if (FLAGS.GENERAL.ENABLE_FOCUS_TRACKER) {
        useFocusTracker();
    }
};