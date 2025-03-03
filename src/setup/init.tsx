import '@/styles/index.scss';
import { createRoot } from 'react-dom/client';
import { Root } from '@/root';
import { getHTMLElement, logger } from '@/utils';



export const init = () => {
    logger.log('init');

    createRoot(getHTMLElement.appRoot).render(<Root/>);
};