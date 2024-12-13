import '@i18n';
import { isDev } from '@vars';



export const preInit = async () => {
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
        });
    }
};