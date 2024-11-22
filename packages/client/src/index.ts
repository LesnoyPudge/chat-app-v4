import { init } from './init';
import { postInit } from './postInit';
import { preInit } from './preInit';


const main = async () => {
    await preInit();

    init();

    postInit();
};

void main();