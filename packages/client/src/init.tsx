import { invariant } from '@lesnoypudge/utils';
import { createRoot } from 'react-dom/client';
import './styles.scss';
import { getAssetUrl } from './utils';
import { FC, Suspense } from 'react';
import { useTrans } from '@i18n';



const Root: FC = () => {
    const { t } = useTrans();

    return (
        <Suspense>
            <div className='font-semibold'>
                <span>{t('zxc')}</span>
                <span>{t('qwe')}</span>
                <span>{t('wow')}</span>
                <span>{t('qwezxc2')}</span>

                <If condition={false}>
                    babel-plugin-jsx-control-statements
                </If>

                <video
                    src={getAssetUrl('DISCORD_ANIMATED_LOGO.webm')}
                    autoPlay
                    muted
                    loop
                />
            </div>
        </Suspense>
    );
};

export const init = () => {
    const root = document.querySelector('#app-root');
    invariant(root, 'root not found');

    createRoot(root).render(<Root/>);
};