import { store } from '@redux/store';
import { Heading } from '@lesnoypudge/utils-react';
import { LazyMotion, MotionConfig } from 'motion/react';
import { FC, PropsWithChildren } from 'react';
import { GlobalLoaderOverlay } from './components';
import { Provider as ReduxProvider } from 'react-redux';



const loadDomAnimation = async () => {
    const res = await import('./lazy/lazyDomAnimations');
    return res.default;
};

export const GlobalProviders: FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <ReduxProvider store={store}>
            <Heading.Provider>
                <LazyMotion
                    features={loadDomAnimation}
                    strict
                >
                    <MotionConfig reducedMotion='user'>
                        <GlobalLoaderOverlay>
                            {children}
                        </GlobalLoaderOverlay>
                    </MotionConfig>
                </LazyMotion>
            </Heading.Provider>
        </ReduxProvider>
    );
};