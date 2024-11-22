import { invariant } from '@lesnoypudge/utils';
import { createRoot } from 'react-dom/client';
import './styles.scss';
import { getAssetUrl } from './utils';


export const init = () => {
    const root = document.querySelector('#app-root');
    invariant(root);

    createRoot(root).render(
        <div className='font-semibold'>
            <span>zxchuesos</span>

            <video
                src={getAssetUrl('DISCORD_ANIMATED_LOGO.webm')}
                autoPlay
                muted
                loop
            />
        </div>,
    );
};