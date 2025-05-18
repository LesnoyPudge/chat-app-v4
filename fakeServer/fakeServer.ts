

import { Endpoints, extractBase64Data } from '@/fakeShared';
import { createPromiseLoader, localStorageApi, logger } from '@/utils';
import {
    delay,
    DefaultBodyType,
    http,
    HttpResponse,
    StrictRequest,
    StrictResponse,
    HttpHandler,
} from 'msw';
import { setupWorker } from 'msw/browser';
import { db, initDB } from './FakeDB';
import { Dummies } from './Dummies';
import { HTTP_METHODS, HTTP_STATUS_CODES, invariant } from '@lesnoypudge/utils';
import { env, FLAGS } from '@/vars';
import { token } from './token';
import { v4 as uuid } from 'uuid';
import {
    flattenPopulated,
    getAppData,
    getDeepConversation,
    getDeepServer,
} from './utils';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { scenarios } from './Scenarios';
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