import { KEY } from '@lesnoypudge/utils';
import { getAppElementCount, localStorageApi, logger } from '@/utils';
import { devtools } from '@/features';



const logConsoleHint = () => {
    logger._common.log(`${KEY.F1} to clear console`);
    logger._common.log(`${KEY.F2} to log activeElement`);
    logger._common.log(`${KEY.F3} to open devtools`);
    logger._common.log(`${KEY.F4} to log element count`);
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
        logger._common.clear();
        logConsoleHint();
    },

    logElementsCount: () => {
        logger._common.log(`${getAppElementCount()} DOM elements`);
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

            const navigateToRoot = devtools.get('navigateToRoot');
            // eslint-disable-next-line no-restricted-globals
            if (!navigateToRoot) return location.reload();

            navigateToRoot();
        })();
    },

    fullReset: () => {
        rawActions.clearLocalStorage();
        rawActions.softResetReduxStore();
        rawActions.clearDatabase();
    },

    populateDB_Small: () => {
        localStorageApi.set('setupScenario', 'populateSmall');
        localStorageApi.removeScenarioSpecificData();

        const navigateToRoot = devtools.get('navigateToRoot');
        // eslint-disable-next-line no-restricted-globals
        if (!navigateToRoot) return location.reload();

        navigateToRoot();
    },

    populateDB_Medium: () => {
        localStorageApi.set('setupScenario', 'populateMedium');
        localStorageApi.removeScenarioSpecificData();

        const navigateToRoot = devtools.get('navigateToRoot');
        // eslint-disable-next-line no-restricted-globals
        if (!navigateToRoot) return location.reload();

        navigateToRoot();
    },

    populateDB_Large: () => {
        localStorageApi.set('setupScenario', 'populateLarge');
        localStorageApi.removeScenarioSpecificData();

        const navigateToRoot = devtools.get('navigateToRoot');
        // eslint-disable-next-line no-restricted-globals
        if (!navigateToRoot) return location.reload();

        navigateToRoot();
    },

    setupMinimalScene: () => {
        localStorageApi.set('setupScenario', 'minimalScene');
        localStorageApi.removeScenarioSpecificData();

        const navigateToRoot = devtools.get('navigateToRoot');
        // eslint-disable-next-line no-restricted-globals
        if (!navigateToRoot) return location.reload();

        navigateToRoot();
    },
} satisfies Record<string, VoidFunction>;