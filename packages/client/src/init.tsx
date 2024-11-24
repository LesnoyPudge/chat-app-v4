import { invariant } from '@lesnoypudge/utils';
import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import { Root } from './Root';



export const init = () => {
    const root = document.querySelector('#app-root');
    invariant(root, 'root not found');

    createRoot(root).render(<Root/>);
};