import '../styles/index.scss';
import { createRoot } from 'react-dom/client';
import { Root } from '../Root';
import { getHTMLElement } from '@utils';



export const init = () => {
    createRoot(getHTMLElement.appRoot()).render(<Root/>);
};