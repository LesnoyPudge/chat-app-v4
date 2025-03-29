import { ExternalLink, Sprite } from '@/components';
import { ASSETS } from '@/generated/ASSETS';
import { useTrans } from '@/hooks';
import { Motion } from '@/libs';
import { createStyles, getAnimationVariants } from '@/utils';
import { FC } from 'react';



const styles = createStyles({
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

const { animationVariants } = getAnimationVariants.custom({
    initial: {
        opacity: 0,
        translateY: '100%',
    },
    animate: {
        opacity: 1,
        translateY: 0,
    },
});

export const ProblemBlock: FC = () => {
    const { t } = useTrans();

    return (
        <Motion.div
            className={styles.problemBlock}
            variants={animationVariants}
            initial={animationVariants.initial.key}
            animate={animationVariants.animate.key}
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
        </Motion.div>
    );
};