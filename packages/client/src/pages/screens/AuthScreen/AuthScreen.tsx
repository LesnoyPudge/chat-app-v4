import { ComponentRef, FC } from 'react';
import { useAuthScreen } from './useAuthScreen';
import { createStyles, createVariants, getAssetUrl } from '@utils';
import { CUSTOM_STYLES } from '@vars';
import { Image, Scrollable, Tab } from '@components';
import { AnimatePresence, m } from 'motion/react';
import {
    ContextConsumerProxy,
    useRefManager,
    MoveFocus,
} from '@lesnoypudge/utils-react';
import { LoginForm, RegistrationForm } from './components';



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
            duration: 0.3,
        },
    },
    visible: {
        opacity: 1,
        translateY: 0,
        scale: 1,
        transition: {
            duration: 0.3,
        },
    },
});

const tabs = {
    login: <LoginForm/>,
    registration: <RegistrationForm/>,
} satisfies Tab.Provider.GenericTabs;

export const AuthTabContext = Tab.createTabContext<typeof tabs>();

export const AuthScreenPure: FC = () => {
    const containerRef = useRefManager<ComponentRef<'div'>>(null);

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
                                        ref={containerRef}
                                    >
                                        <MoveFocus.Inside
                                            key={currentTab.identifier}
                                            enabled
                                            forced
                                            once
                                            containerRef={containerRef}
                                        >
                                            {currentTab.tab}
                                        </MoveFocus.Inside>
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