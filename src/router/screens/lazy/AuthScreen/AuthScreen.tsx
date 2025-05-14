import { FC } from 'react';
import { useAuthScreen } from './useAuthScreen';
import { createStyles, getAnimationVariants } from '@/utils';
import { CUSTOM_STYLES } from '@/vars';
import { Image, Scrollable, Tab } from '@/components';
import { AnimatePresence } from 'motion/react';
import {
    createWithDecorator,
    Focus,
    useRefManager,
    withDisplayName,
} from '@lesnoypudge/utils-react';
import { LoginFormComponent, RegistrationFormComponent } from './components';
import { Screen } from '@/router/layouts/bundled';
import { ASSETS } from '@/generated/ASSETS';
import { Motion } from '@/libs';
import { decorate } from '@lesnoypudge/macro';



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
        translateY: '0%',
        scale: 1,
        transition: {
            duration: 0.3,
        },
    },
});

export const { AuthTabs } = Tab.createTypedTabs({
    name: 'Auth',
    tabs: {
        Login: <LoginFormComponent/>,
        Registration: <RegistrationFormComponent/>,
    },
});

const { withDecorator } = createWithDecorator(({ children }) => (
    <AuthTabs.Provider
        label=''
        initialTab={AuthTabs.tabNameTable.Login}
    >
        {children}
    </AuthTabs.Provider>
));

decorate(withDisplayName, 'AuthScreenPure', decorate.target);
decorate(withDecorator, decorate.target);

export const AuthScreenPure: FC = () => {
    const containerRef = useRefManager<HTMLDivElement>(null);
    const { currentTab } = AuthTabs.useProxy();

    return (
        <AuthTabs.Provider
            label=''
            initialTab={AuthTabs.tabNameTable.Login}
        >
            <Screen>
                <Image
                    className={styles.bg}
                    pointer={ASSETS.IMAGES.COMMON.FANCY_BG}
                />

                <Scrollable className={styles.scrollable}>
                    <div className={styles.content}>
                        <AnimatePresence mode='wait'>
                            <Motion.div
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
                            </Motion.div>
                        </AnimatePresence>
                    </div>
                </Scrollable>
            </Screen>
        </AuthTabs.Provider>
    );
};

export const AuthScreen: FC = () => {
    return <AuthScreenPure {...useAuthScreen()}/>;
};