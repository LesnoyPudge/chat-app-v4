import { setup } from '@/setup';
import { logger } from '@/utils';



const main = async () => {
    try {
        await setup.preInit();

        setup.init();

        void setup.postInit();
    } catch (error) {
        logger._common.error(error);
    }
};

void main();