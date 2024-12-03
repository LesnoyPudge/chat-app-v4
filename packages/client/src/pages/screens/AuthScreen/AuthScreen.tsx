import { FC } from 'react';
import { useAuthScreen } from './useAuthScreen';
import { createStyles, createVariants, getAssetUrl } from '@utils';
import { CUSTOM_STYLES } from '@vars';
import { Image, Scrollable } from '@components';
import { useBoolean, useInterval } from '@lesnoypudge/utils-react';
import { AnimatePresence, m } from 'motion/react';



const styles = createStyles({
    screen: CUSTOM_STYLES.SCREEN,
    bg: CUSTOM_STYLES.IMAGE_BG_FULLSCREEN,
    scrollable: 'h-full',
    content: `
        grid 
        min-h-full 
        place-items-center
        overflow-hidden
    `,
    itemWrapper: `
        w-[min(100%,480px)] 
        rounded 
        bg-primary-200 
        p-8 
        shadow-elevation-high
    `,
});

const variants = createVariants({
    hidden: {
        opacity: 0,
        translateY: '-8%',
        scale: 1.02,
    },
    visible: {
        opacity: 1,
        translateY: 0,
        scale: 1,
    },
});

export const AuthScreenPure: FC = () => {
    const state = useBoolean(true);

    useInterval(state.toggle, 3_000);

    return (
        <div className={styles.screen}>
            <Image
                className={styles.bg}
                src={getAssetUrl('FANCY_BG.jpg')}
            />

            <Scrollable
                className={styles.scrollable}
                withOppositeGutter
                label='Authentication page'
            >
                <div className={styles.content}>
                    <AnimatePresence mode='wait'>
                        <m.div
                            className={styles.itemWrapper}
                            key={String(state.value)}
                            transition={{
                                duration: 0.125,
                            }}
                            variants={variants}
                            initial={variants.hidden.key}
                            animate={variants.visible.key}
                            exit={variants.hidden.key}
                        >
                            <>wow: {String(state.value)}</>
                        </m.div>
                    </AnimatePresence>
                </div>
            </Scrollable>
        </div>
    );
};

export const AuthScreen: FC = () => {
    return <AuthScreenPure {...useAuthScreen()}/>;
};