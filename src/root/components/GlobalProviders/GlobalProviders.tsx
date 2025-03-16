import { Navigator } from '@/features';
import { Heading } from '@lesnoypudge/utils-react';
import { LazyMotion, MotionConfig } from 'motion/react';
import { FC, PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { store } from '@/redux/store';



const loadDomAnimation = async () => {
    return await import('./lazy/lazyDomAnimations').then((v) => v.default);
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