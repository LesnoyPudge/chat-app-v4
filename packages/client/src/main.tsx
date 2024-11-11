import { invariant } from '@lesnoypudge/utils';
import { FC, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.scss';

void fetch(
    'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css',
).then((v) => {
    return v.text();
}).then((v) => {
    const style = document.createElement('style');
    style.innerHTML = v;
    document.head.append(style);
});

const root = document.querySelector('#root');
invariant(root);

createRoot(root).render(<StrictMode><App/></StrictMode>);