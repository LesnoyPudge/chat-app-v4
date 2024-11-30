import { i18nInit } from '@i18n';
import { isDev } from '@vars';



export const preInit = async () => {
    if (isDev) {
        const { scan } = await import('react-scan');

        // eslint-disable-next-line no-console
        const log = console.log;
        const messageToIgnore = [
            'Try Million Lint to automatically',
            'optimize your app: https://million.dev',
        ].join(' ');

        // eslint-disable-next-line no-console
        console.log = (...args) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const messageArg = args[0];
            if (messageArg === messageToIgnore) {
                return;
            }

            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            log(...args);
        };

        scan({
            enabled: false,
            log: true,
        });
    }

    await i18nInit();
};