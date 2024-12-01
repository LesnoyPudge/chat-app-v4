import { logger } from '@utils';



class FakeServerImpl {
    constructor() {
        logger.log('FakeServer initialized');
    }

    async fetch() {}
}

export const FakeServer = new FakeServerImpl();