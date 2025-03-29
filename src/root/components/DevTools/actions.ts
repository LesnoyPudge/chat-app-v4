import { KEY, toOneLine } from '@lesnoypudge/utils';
import { localStorageApi, logger } from '@/utils';
import { devtools } from '@/features';



const logConsoleHint = () => {
    logger.log(`${KEY.F1} to clear console`);
    logger.log(`${KEY.F2} to log activeElement`);
    logger.log(`${KEY.F3} to open devtools`);
    logger.log(`${KEY.F4} to log element count`);
};

logConsoleHint();

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
        const store = devtools.get('reduxStore');
        const softReset = devtools.get('softReset');
        if (!store) return;
        if (!softReset) return;

        store.dispatch(softReset());
    },

    runAxe: () => {
        devtools.get('axeReact')?.();
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

    clearDatabase: () => {
        void (async () => {
            const { db } = await import('@/fakeServer');

            await db.clearStorage();

            // eslint-disable-next-line no-restricted-globals
            location.reload();
        })();
    },

    populateDB_Small: () => {
        localStorageApi.set('shouldPopulate', 'small');
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    },

    populateDB_Medium: () => {
        localStorageApi.set('shouldPopulate', 'medium');
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    },

    populateDB_Large: () => {
        logger.log('LONG LOADING IS EXPECTED');
        localStorageApi.set('shouldPopulate', 'large');
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    },
} satisfies Record<string, VoidFunction>;