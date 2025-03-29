import { LazyModules } from '@/root/components';
import { useBoolean, useTimeout } from '@lesnoypudge/utils-react';



const TIME_DELAY = 3_000;

export const useGlobalLoaderScreen = () => {
    const timeDelayState = useBoolean(false);
    const { i18n } = LazyModules.useContext();

    useTimeout(timeDelayState.setTrue, TIME_DELAY);

    const showProblemBlock = timeDelayState.value && i18n.isLoaded;

    return {
        showProblemBlock,
    };
};