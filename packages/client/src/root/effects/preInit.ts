import '@i18n';
import { fakeServer } from '@fakeServer';
import { isDev } from '@vars';
import { logger } from '@utils';



export const preInit = async () => {
    logger.log('preInit');

    await fakeServer.init();

    if (isDev) {
        const { scan } = await import('react-scan');


        // const log = console.log;
        // const messageToIgnore = [
        //     'Try Million Lint to automatically',
        //     'optimize your app: https://million.dev',
        // ].join(' ');


        // console.log = (...args) => {
        //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        //     const messageArg = args[0];
        //     if (messageArg === messageToIgnore) {
        //         return;
        //     }

        //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        //     log(...args);
        // };

        scan({
            enabled: true,
            log: true,
            alwaysShowLabels: false,
            showToolbar: false,
        });
    }
};