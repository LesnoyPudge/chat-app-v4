import '@root/styles/index.scss';
import { createRoot } from 'react-dom/client';
import { Root } from '@root/Root';
import { getHTMLElement } from '@utils';
import { StrictMode } from 'react';



export const init = () => {
    createRoot(getHTMLElement.appRoot()).render(
        <StrictMode>
            <Root/>
            {/* eslint-disable-next-line @stylistic/comma-dangle */}
        </StrictMode>
    );
};