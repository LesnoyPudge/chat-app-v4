import { useBoolean, useTimeout } from '@lesnoypudge/utils-react';



export const useGlobalLoaderScreen = () => {
    const { value, setTrue } = useBoolean(false);

    useTimeout(setTrue, 3_000);

    return {
        showProblemBlock: value,
    };
};