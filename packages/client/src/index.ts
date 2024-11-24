import { preInit } from './preInit';
import { init } from './init';
import { postInit } from './postInit';


const main = async () => {
    await preInit();

    init();

    postInit();
};

void main();