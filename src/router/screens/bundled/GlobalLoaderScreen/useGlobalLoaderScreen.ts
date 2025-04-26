import { LazyModules } from '@/root/components';
import { useBoolean, useTimeout } from '@lesnoypudge/utils-react';
import { secondsToMilliseconds } from 'date-fns';



const DELAY = secondsToMilliseconds(10);

export const useGlobalLoaderScreen = () => {
    const timeDelayState = useBoolean(false);
    const isLoaded = LazyModules.useIsModuleLoaded('i18n');

    useTimeout(timeDelayState.setTrue, DELAY);

    const showProblemBlock = timeDelayState.value && isLoaded;

    return {
        showProblemBlock,
    };
};