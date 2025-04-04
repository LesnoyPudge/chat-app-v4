import { Navigator, Store } from '@/features';
import { ReduxReact } from '@/libs';
import { Heading } from '@lesnoypudge/utils-react';
import { LazyMotion, MotionConfig } from 'motion/react';
import { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router';
import { GlobalLoader, LazyModules } from '@/root/components';
import { LayoutType } from '@/components';



const store = Store.Utils.setupStore();

const loadDomAnimation = async () => {
    return await import('./lazy/lazyDomAnimations').then((v) => v.default);
};

export const GlobalProviders: FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <ReduxReact.Provider store={store}>
            <LazyModules.Provider>
                <LazyMotion features={loadDomAnimation} strict>
                    <MotionConfig reducedMotion='user'>
                        <BrowserRouter>
                            <Navigator.Provider>
                                <Heading.Provider>
                                    <LayoutType.Provider>
                                        <GlobalLoader.Wrapper>
                                            {children}
                                        </GlobalLoader.Wrapper>
                                    </LayoutType.Provider>
                                </Heading.Provider>
                            </Navigator.Provider>
                        </BrowserRouter>
                    </MotionConfig>
                </LazyMotion>
            </LazyModules.Provider>
        </ReduxReact.Provider>
    );
};