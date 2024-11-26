import { preInit, init, postInit } from './root';


const main = async () => {
    await preInit();

    init();

    void postInit();
};

void main();