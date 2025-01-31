import '@root/styles/index.scss';
import { createRoot } from 'react-dom/client';
import { Root } from '@root/Root';
import { getHTMLElement, logger } from '@utils';
import { ControllableStrictMode } from '@lesnoypudge/utils-react';



export const init = () => {
    logger.log('init');

    createRoot(getHTMLElement.appRoot).render((
        <ControllableStrictMode isEnabled={false}>
            <Root/>
        </ControllableStrictMode>
    ));
};