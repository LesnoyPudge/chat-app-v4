import '@root/styles/index.scss';
import { createRoot } from 'react-dom/client';
import { Root } from '@root/Root';
import { getHTMLElement, logger } from '@utils';
import { StrictMode } from 'react';



export const init = () => {
    logger.log('init');

    createRoot(getHTMLElement.appRoot()).render(
        <StrictMode>
            <Root/>
            {/* eslint-disable-next-line @stylistic/comma-dangle */}
        </StrictMode>
    );
};