import { Navigator } from '@/features';
import { store } from '@/redux/store';
import { Heading } from '@lesnoypudge/utils-react';
import { LazyMotion, MotionConfig } from 'motion/react';
import { FC, PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router';



const loadDomAnimation = async () => {
    const res = await import('./lazy/lazyDomAnimations');
    return res.default;
};

export const GlobalProviders: FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <BrowserRouter>
            <Navigator.Provider>
                <ReduxProvider store={store}>
                    <Heading.Provider>
                        <LazyMotion
                            features={loadDomAnimation}
                            strict
                        >
                            <MotionConfig reducedMotion='user'>
                                {children}
                            </MotionConfig>
                        </LazyMotion>
                    </Heading.Provider>
                </ReduxProvider>
            </Navigator.Provider>
        </BrowserRouter>
    );
};