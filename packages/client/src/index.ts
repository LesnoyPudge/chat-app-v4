import { init } from './init';
import { postInit } from './postInit';
import { preInit } from './preInit';


const main = () => {
    preInit();

    init();

    postInit();
};

main();