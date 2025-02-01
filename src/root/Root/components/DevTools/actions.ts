import { KEY } from '@lesnoypudge/utils';
import { localStorageApi, logger, toOneLine } from '@utils';



// @ts-expect-error
if (!window._devtools) {
    // @ts-expect-error
    window._devtools = {};
}

const logConsoleHint = () => {
    logger.log(`${KEY.F1} to clear console`);
    logger.log(`${KEY.F2} to log activeElement`);
    logger.log(`${KEY.F3} to open devtools`);
};

export const rawActions = {
    toggleElementsOutline: () => {
        const currentValue = (
            document
                .documentElement
                .dataset
                .outline as 'false' | 'true' | undefined
        );

        document.documentElement.dataset.outline = (
            (
                currentValue === 'false'
                || !currentValue
            ) ? 'true' : 'false'
        );
    },

    toggleBackgroundHighlight: () => {
        const currentValue = (
            document
                .documentElement
                .dataset
                .background as 'false' | 'true' | undefined
        );

        document.documentElement.dataset.background = (
            (
                currentValue === 'false'
                || !currentValue
            ) ? 'true' : 'false'
        );
    },

    softResetReduxStore: () => {
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        window._devtools?.store?.dispatch(
            // @ts-expect-error
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            window._devtools?.softReset(),
        );
    },

    runAxe: () => {
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        window._devtools?.axeReact();
    },

    clearConsole: () => {
        logger.clear();
        logConsoleHint();
    },

    logElementsCount: () => {
        logger.log(toOneLine(`
            ${document.querySelectorAll('*')?.length} 
            DOM elements
        `));
    },

    setDarkTheme: () => {
        document.documentElement.dataset.theme = 'dark';
    },

    setLightTheme: () => {
        document.documentElement.dataset.theme = 'light';
    },

    setAutoTheme: () => {
        document.documentElement.dataset.theme = 'auto';
    },

    clearLocalStorage: () => {
        localStorageApi.clear();
    },
} satisfies Record<string, VoidFunction>;

logConsoleHint();