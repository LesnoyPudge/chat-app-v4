import { FC } from 'react';
import { useAuthScreen } from './useAuthScreen';
import { createStyles, createVariants, getAssetUrl } from '@utils';
import { CUSTOM_STYLES } from '@vars';
import { Image, Scrollable, Tab } from '@components';
import { AnimatePresence, m } from 'motion/react';
import { ContextConsumerProxy } from '@lesnoypudge/utils-react';
import { LoginForm } from './components';



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
        transition: {
            duration: 0.125,
        },
    },
    visible: {
        opacity: 1,
        translateY: 0,
        scale: 1,
        transition: {
            duration: 0.125,
        },
    },
});

const tabs = {
    login: <LoginForm/>,
    registration: <>registration</>,
} satisfies Tab.Provider.GenericTabs;

export const AuthTabContext = Tab.createTabContext<typeof tabs>();

export const AuthScreenPure: FC = () => {
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
                        <Tab.Provider
                            context={AuthTabContext}
                            tabs={tabs}
                            initialTab='login'
                        >
                            <ContextConsumerProxy context={AuthTabContext}>
                                {({ currentTab }) => (
                                    <m.div
                                        className={styles.itemWrapper}
                                        key={currentTab.identifier}
                                        variants={variants}
                                        initial={variants.hidden.key}
                                        animate={variants.visible.key}
                                        exit={variants.hidden.key}
                                    >
                                        {currentTab.tab}
                                    </m.div>
                                )}
                            </ContextConsumerProxy>
                        </Tab.Provider>
                    </AnimatePresence>
                </div>
            </Scrollable>
        </div>
    );
};

export const AuthScreen: FC = () => {
    return <AuthScreenPure {...useAuthScreen()}/>;
};