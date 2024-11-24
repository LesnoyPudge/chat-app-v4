import { createStyles, getAssetUrl } from '@utils';
import { FC, Suspense } from 'react';
import { useTrans } from '@i18n';



const styles = createStyles({
    wrapper: 'font-semibold',
    test: `
        text-xl 
        mobile:bg-slate-400 
        bg-green-500
    `,
});

export const Root: FC = () => {
    const { t } = useTrans();

    return (
        <Suspense>
            <div className={styles.wrapper}>
                <span>{t('zxc')}</span>
                <span>{t('qwe')}</span>
                <span>{t('wow')}</span>
                <span>{t('qwezxc2')}</span>

                <If condition={false}>
                    babel-plugin-jsx-control-statements
                </If>

                <div
                    className={styles.test}
                >
                    should work
                </div>

                <video
                    src={getAssetUrl('DISCORD_ANIMATED_LOGO.webm')}
                    autoPlay
                    muted
                    loop
                    controls
                />
            </div>
        </Suspense>
    );
};