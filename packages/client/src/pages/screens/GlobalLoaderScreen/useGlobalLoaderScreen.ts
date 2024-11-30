import { useBoolean, useTimeout } from '@lesnoypudge/utils-react';
import { isDev } from '@vars';



export const useGlobalLoaderScreen = () => {
    const { value, setTrue } = useBoolean(false);

    useTimeout(() => {
        setTrue();
    }, isDev ? 500 : 3_000);

    return {
        showProblemBlock: value,
    };
};