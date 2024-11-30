import { CUSTOM_STYLES } from '@vars';
import { FC } from 'react';
import { createStyles, getAssetUrl } from '@utils';
import { useGlobalLoaderScreen } from './useGlobalLoaderScreen';
import { m } from 'motion/react';
import { ExternalLink, Scrollable, Sprite } from '@components';
import { useTrans } from '@i18n';



const styles = createStyles({
    screen: `
        ${CUSTOM_STYLES.SCREEN} 
        pointer-events-auto 
        bg-primary-400
    `,
    scrollable: 'h-full',
    content: `
        grid 
        min-h-full 
        place-items-center 
        overflow-hidden 
        [grid-template-rows:1fr_auto_1fr]
    `,
    logo: 'row-start-2 size-[min(100%,200px)]',
    problemBlock: `
        row-start-3
        flex
        flex-col
        gap-2 
        place-self-center 
        self-end 
        bg-primary-400 
        px-4 
        pb-8
        text-center
    `,
    problemText: 'text-sm text-color-secondary',
    links: `
        flex 
        flex-wrap 
        justify-center 
        gap-x-5 
        text-color-link
    `,
    link: 'inline-flex items-center gap-2',
    icon: 'inline-block h-4 w-5 fill-current',
});

export namespace GlobalLoaderScreenPure {
    export type Props = ReturnType<typeof useGlobalLoaderScreen>;
}

export const GlobalLoaderScreenPure: FC<GlobalLoaderScreenPure.Props> = ({
    showProblemBlock,
}) => {
    const { t } = useTrans();

    return (
        <div className={styles.screen}>
            <Scrollable className={styles.scrollable}>
                <div className={styles.content}>
                    <video
                        className={styles.logo}
                        autoPlay
                        loop
                        disablePictureInPicture
                        disableRemotePlayback
                        playsInline
                        muted
                        poster={getAssetUrl('ANIMATED_DISCORD_LOGO_PLACEHOLDER.png')}
                    >
                        <source
                            src={getAssetUrl('DISCORD_ANIMATED_LOGO.webm')}
                            type='video/webm'
                        />
                    </video>

                    <If condition={showProblemBlock}>
                        <m.div
                            className={styles.problemBlock}
                            initial={{
                                opacity: 0,
                                translateY: '100%',
                            }}
                            animate={{
                                opacity: 1,
                                translateY: 0,
                            }}
                        >
                            <p className={styles.problemText}>
                                {t('GlobalLoaderScreen.problems')}
                            </p>

                            <div className={styles.links}>
                                <ExternalLink
                                    className={styles.link}
                                    giveUp
                                >
                                    <Sprite
                                        className={styles.icon}
                                        name='TWITTER_ICON'
                                    />

                                    <span>
                                        {t('GlobalLoaderScreen.textUsLink')}
                                    </span>
                                </ExternalLink>

                                <ExternalLink
                                    className={styles.link}
                                    giveUp
                                >
                                    {t('GlobalLoaderScreen.statusLink')}
                                </ExternalLink>
                            </div>
                        </m.div>
                    </If>
                </div>
            </Scrollable>
        </div>
    );
};

export const GlobalLoaderScreen: FC = () => {
    return (
        <GlobalLoaderScreenPure {...useGlobalLoaderScreen()}/>
    );
};