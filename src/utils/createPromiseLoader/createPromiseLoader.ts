import { derivedPromise } from '@lesnoypudge/utils';



export const createPromiseLoader = () => {
    let isLoading = false;
    let isLoaded = false;

    const [promise, controls] = derivedPromise(() => {});

    const startLoading = () => {
        isLoading = true;
    };

    const finishLoading = () => {
        isLoading = false;
        isLoaded = true;
        controls.resolve();
    };

    const abortLoading = () => {
        isLoading = false;
    };

    const getIsLoading = () => isLoading;

    const getIsLoaded = () => isLoaded;

    return {
        loader: promise,
        startLoading,
        finishLoading,
        abortLoading,
        getIsLoaded,
        getIsLoading,
    };
};