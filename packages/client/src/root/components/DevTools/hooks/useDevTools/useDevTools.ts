import { useHotKey, useKeyboardNavigation } from '@hooks';
import { KEY } from '@lesnoypudge/utils';
import { useBoolean, useRefManager } from '@lesnoypudge/utils-react';
import { logger, toOneLine } from '@utils';


// @ts-expect-error
if (!window._devtools) {
    // @ts-expect-error
    window._devtools = {};
}

const actions: Record<string, VoidFunction> = {
    toggleElementsOutline: () => {
        const currentValue = (
            document
                .documentElement
                .dataset
                .outline as 'false' | 'true'
        );

        document.documentElement.dataset.outline = (
            currentValue === 'false' ? 'true' : 'false'
        );
    },

    toggleBackgroundHighlight: () => {
        const currentValue = (
            document
                .documentElement
                .dataset
                .background as 'false' | 'true'
        );

        document.documentElement.dataset.background = (
            currentValue === 'false' ? 'true' : 'false'
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

    clearConsole: () => logger.clear(),

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
};

export const useDevTools = () => {
    const state = useBoolean(false);
    const wrapperRef = useRefManager<HTMLDivElement>(null);
    const navigation = useKeyboardNavigation(wrapperRef, {
        list: Object.keys(actions),
        direction: 'vertical',
        loop: true,
    });

    useHotKey(document, [KEY.Shift, KEY.Control, KEY.P], (e) => {
        e.preventDefault();
        state.setTrue();
    });

    return {
        ...navigation,
        state,
        actions,
        wrapperRef,
    };
};