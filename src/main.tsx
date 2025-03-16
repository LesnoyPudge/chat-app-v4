// import { setup } from '@/setup';
import { getHTMLElement, logger } from '@/utils';
// import { createRoot } from 'react-dom/client';


const test = <></>;
console.log(test);
const main = async () => {
    try {
        void import('./lazy');
        // const Root = await import('./lazy').then((v) => v.Root);
        // createRoot(getHTMLElement.appRoot).render(<Root/>);

        // await setup.preInit();

        // setup.init();

        // void setup.postInit();
    } catch (error) {
        logger.error(error);
    }
};

void main();