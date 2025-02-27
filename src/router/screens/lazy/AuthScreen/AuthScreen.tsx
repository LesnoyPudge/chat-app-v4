import { FC } from 'react';
import { useAuthScreen } from './useAuthScreen';
import { createStyles, getAnimationVariants, getAssetUrl } from '@utils';
import { CUSTOM_STYLES } from '@vars';
import { Image, Scrollable, Tab } from '@components';
import { AnimatePresence, m } from 'motion/react';
import {
    ContextSelectable,
    Focus,
    useRefManager,
} from '@lesnoypudge/utils-react';
import { LoginForm, RegistrationForm } from './components';
import { Screen } from '@router/layouts/bundled';
import { ASSETS } from '@generated/ASSETS';



const styles = createStyles({
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

const { animationVariants } = getAnimationVariants.custom({
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
    const containerRef = useRefManager<HTMLDivElement>(null);

    return (
        <Screen>
            <Image
                className={styles.bg}
                src={getAssetUrl(ASSETS.IMAGES.COMMON.FANCY_BG)}
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
                            <ContextSelectable.ConsumerProxy context={AuthTabContext}>
                                {({ currentTab }) => (
                                    <m.div
                                        className={styles.itemWrapper}
                                        key={currentTab.identifier}
                                        variants={animationVariants}
                                        initial={animationVariants.hidden.key}
                                        animate={animationVariants.visible.key}
                                        exit={animationVariants.hidden.key}
                                        ref={containerRef}
                                    >
                                        <Focus.Inside
                                            isEnabled={true}
                                            containerRef={containerRef}
                                        >
                                            {currentTab.tab}
                                        </Focus.Inside>
                                    </m.div>
                                )}
                            </ContextSelectable.ConsumerProxy>
                        </Tab.Provider>
                    </AnimatePresence>
                </div>
            </Scrollable>
        </Screen>
    );
};

export const AuthScreen: FC = () => {
    return <AuthScreenPure {...useAuthScreen()}/>;
};