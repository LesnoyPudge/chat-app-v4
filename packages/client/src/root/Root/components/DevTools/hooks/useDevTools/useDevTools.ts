import { Navigator, Overlay } from '@components';
import { useHotKey, useKeyboardNavigation } from '@hooks';
import { capitalize, KEY } from '@lesnoypudge/utils';
import { useRefManager } from '@lesnoypudge/utils-react';
import { localStorageApi, logger, toOneLine } from '@utils';


// @ts-expect-error
if (!window._devtools) {
    // @ts-expect-error
    window._devtools = {};
}

const logConsoleHint = () => {
    logger.log(`${KEY.F1} to clear console`);
    logger.log(`${KEY.F2} to log activeElement`);
};

const rawActions = {
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

export const useDevTools = () => {
    const controls = Overlay.useOverlayControls(false);
    const wrapperRef = useRefManager<HTMLDivElement>(null);
    const { navigateTo, navigate } = Navigator.useNavigator();

    const navigateToDev = Object.entries({
        playground: () => navigate(Navigator.navigatorDevPath.playground),
        errorScreen: () => navigate(Navigator.navigatorDevPath.errorScreen),
        authScreen: () => navigate(Navigator.navigatorDevPath.authScreen),
        invitationScreen: () => navigate(
            Navigator.navigatorDevPath.invitationScreen,
        ),
        globalLoaderScreen: () => navigate(
            Navigator.navigatorDevPath.globalLoaderScreen,
        ),
    }).reduce<Record<string, () => void | Promise<void>>>((
        acc,
        [key, value],
    ) => {
        acc[`navigateToDev${capitalize(key)}`] = value;

        return acc;
    }, {});

    const navigateToWithPrompt = Object.entries({
        root: navigateTo.root,
        auth: navigateTo.auth,
        conversation: () => {
            const conversationId = prompt('conversationId');
            if (!conversationId) return;

            return navigateTo.conversation({ conversationId });
        },
        invitation: () => {
            const invitationCode = prompt('invitationCode');
            if (!invitationCode) return;

            return navigateTo.invitation({ invitationCode });
        },
        server: () => {
            const serverId = prompt('serverId');
            if (!serverId) return;

            return navigateTo.server({ serverId });
        },
        channel: () => {
            const serverId = prompt('serverId');
            if (!serverId) return;

            const channelId = prompt('channelId');
            if (!channelId) return;

            return navigateTo.channel({ serverId, channelId });
        },
    }).reduce<Record<string, () => void | Promise<void>>>((
        acc,
        [key, value],
    ) => {
        acc[`navigateToWithPrompt${capitalize(key)}`] = value;

        return acc;
    }, {});

    const actions = {
        ...rawActions,
        ...navigateToDev,
        ...navigateToWithPrompt,
    };

    const navigation = useKeyboardNavigation(wrapperRef, {
        list: Object.keys(actions),
        direction: 'vertical',
        loop: true,
    });

    useHotKey(document, [KEY.Shift, KEY.Control, KEY.P], (e) => {
        e.preventDefault();
        controls.open();
    });

    useHotKey(
        document,
        [KEY.F1],
        rawActions.clearConsole,
        { hotKeyOptions: { prevent: true } },
    );

    useHotKey(
        document,
        [KEY.F2],
        () => logger.log(document.activeElement),
        { hotKeyOptions: { prevent: true } },
    );

    return {
        ...navigation,
        controls,
        actions,
        wrapperRef,
    };
};