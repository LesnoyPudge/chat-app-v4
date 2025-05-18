import { createPromiseLoader, logger } from '@/utils';
import { setupWorker } from 'msw/browser';
import { initDB } from './FakeDB';
import { env, FLAGS } from '@/vars';
import { getRoutes } from './routes';



const {
    abortLoading,
    finishLoading,
    getIsLoaded,
    getIsLoading,
    loader,
    startLoading,
} = createPromiseLoader();

class FakeServer {
    async init() {
        if (getIsLoaded()) return loader;
        if (getIsLoading()) return loader;

        startLoading();

        try {
            logger.fakeServer.log('FakeServer initialization started');

            await initDB();

            const worker = setupWorker(...getRoutes());

            await worker.start({
                quiet: !FLAGS.THIRD_PARTY_LOGS.msw,
                onUnhandledRequest: (request, print) => {
                    if (!request.url.includes(env._PUBLIC_API_V1)) return;

                    print.warning();
                },
                // findWorker: (scriptUrl, mockServiceWorkerUrl) => {
                //     return scriptUrl.includes('mockServiceWorker');
                // },
            });

            logger.fakeServer.log('FakeServer initialization ended');
        } catch (error) {
            abortLoading();
            throw error;
        }

        finishLoading();
    }
};

export const fakeServer = new FakeServer();