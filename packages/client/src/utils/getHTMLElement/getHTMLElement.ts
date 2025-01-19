import { invariant } from '@lesnoypudge/utils';



export const getHTMLElement = {
    appRoot: (() => {
        const element = document.querySelector('#app-root');
        invariant(element, 'app-root not found');

        return element as HTMLDivElement;
    })(),

    overlayRoot: (() => {
        const element = document.querySelector('#overlay-root');
        invariant(element, 'overlay-root not found');

        return element as HTMLDivElement;
    })(),

    H1: (() => {
        const element = document.querySelector('h1');
        invariant(element, 'h1');

        return element;
    })(),
};