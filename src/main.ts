import { setup } from '@/setup';
import { logger } from '@/utils';
import { defer } from '@lesnoypudge/utils-web';



const main = async () => {
    try {
        await setup.preInit();

        setup.init();

        void defer(setup.postInit);
    } catch (error) {
        logger.error(error);
    }
};

void main();