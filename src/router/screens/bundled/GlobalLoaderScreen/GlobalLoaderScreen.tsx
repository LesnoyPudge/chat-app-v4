import { FC } from 'react';
import { cn, createStyles, getAssetUrl } from '@/utils';
import { useGlobalLoaderScreen } from './useGlobalLoaderScreen';
import { m } from 'motion/react';
import { ExternalLink, Scrollable, Sprite } from '@/components';
import { useTrans } from '@/hooks';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Screen } from '@/router/layouts/bundled';
import { ASSETS } from '@/generated/ASSETS';



const styles = createStyles({
    screen: `pointer-events-auto bg-primary-400`,
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
    export type Props = (
        GlobalLoaderScreen.Props
        & ReturnType<typeof useGlobalLoaderScreen>
    );
}

export const GlobalLoaderScreenPure: FC<GlobalLoaderScreenPure.Props> = ({
    className = '',
    showProblemBlock,
}) => {
    const { t } = useTrans();

    return (
        <Screen className={cn(styles.screen, className)}>
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
                        poster={getAssetUrl(ASSETS.IMAGES.COMMON.ANIMATED_DISCORD_LOGO_PLACEHOLDER)}
                    >
                        <source
                            src={getAssetUrl(ASSETS.VIDEOS.DISCORD_ANIMATED_LOGO)}
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
                                        sprite={ASSETS.IMAGES.SPRITE.TWITTER_ICON}
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
        </Screen>
    );
};

export namespace GlobalLoaderScreen {
    export type Props = RT.PropsWithClassName;
}

export const GlobalLoaderScreen: FC<GlobalLoaderScreen.Props> = (props) => {
    return (
        <GlobalLoaderScreenPure
            {...props}
            {...useGlobalLoaderScreen()}
        />
    );
};