import { invariant } from '@lesnoypudge/utils';



export const getHTMLElement = {
    appRoot: () => {
        const element = document.querySelector('#app-root');
        invariant(element, 'app-root not found');

        return element;
    },

    overlayRoot: () => {
        const element = document.querySelector('#overlay-root');
        invariant(element, 'overlay-root not found');

        return element;
    },
};