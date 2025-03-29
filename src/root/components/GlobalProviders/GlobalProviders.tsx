import { Navigator, Store } from '@/features';
import { ReduxReact } from '@/libs';
import { Heading } from '@lesnoypudge/utils-react';
import { LazyMotion, MotionConfig } from 'motion/react';
import { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router';
import { GlobalLoader, LazyModules } from '@/root/components';



const store = Store.Utils.setupStore();

const loadDomAnimation = async () => {
    return await import('./lazy/lazyDomAnimations').then((v) => v.default);
};

export const GlobalProviders: FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <LazyModules.Provider>
            <BrowserRouter>
                <Navigator.Provider>
                    <ReduxReact.Provider store={store}>
                        <Heading.Provider>
                            <LazyMotion features={loadDomAnimation} strict>
                                <MotionConfig reducedMotion='user'>
                                    <GlobalLoader.Wrapper>
                                        {children}
                                    </GlobalLoader.Wrapper>
                                </MotionConfig>
                            </LazyMotion>
                        </Heading.Provider>
                    </ReduxReact.Provider>
                </Navigator.Provider>
            </BrowserRouter>
        </LazyModules.Provider>
    );
};