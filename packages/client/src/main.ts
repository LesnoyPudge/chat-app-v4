import { preInit, init, postInit } from '@root/effects';
import { logger } from '@utils';



const main = async () => {
    try {
        await preInit();

        init();

        void postInit();
    } catch (error) {
        logger.dev.error(error);
    }
};

void main();