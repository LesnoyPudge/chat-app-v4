import { Navigator, Store } from '@/features';
import { ReduxReact } from '@/libs';
import {
    createWithDecorator,
    ErrorThrower,
    Heading,
    withDisplayName,
} from '@lesnoypudge/utils-react';
import { LazyMotion, MotionConfig } from 'motion/react';
import { FC, PropsWithChildren, Suspense } from 'react';
import { BrowserRouter } from 'react-router';
import { GlobalLoader, LazyModules } from '@/root/components';
import { LayoutType } from '@/components';
import { decorate } from '@lesnoypudge/macro';



const store = Store.Utils.setupStore();

const loadDomAnimation = async () => {
    return await import('./lazy/lazyDomAnimations').then((v) => v.default);
};

const {
    withDecorator: withFirstDecorator,
} = createWithDecorator(({ children }) => (
    <ReduxReact.Provider store={store}>
        <LazyModules.Provider>
            <LazyMotion features={loadDomAnimation} strict>
                <MotionConfig reducedMotion='user'>
                    <BrowserRouter>
                        {children}
                    </BrowserRouter>
                </MotionConfig>
            </LazyMotion>
        </LazyModules.Provider>
    </ReduxReact.Provider>
));


const {
    withDecorator: withSecondDecorator,
} = createWithDecorator(({ children }) => (
    <Navigator.Provider>
        <Heading.Provider>
            <LayoutType.Provider>
                <GlobalLoader.Wrapper>
                    {children}
                </GlobalLoader.Wrapper>
            </LayoutType.Provider>
        </Heading.Provider>
    </Navigator.Provider>
));

decorate(withDisplayName, 'GlobalProviders', decorate.target);
decorate(withFirstDecorator, decorate.target);
decorate(withSecondDecorator, decorate.target);

export const GlobalProviders: FC<PropsWithChildren> = ({
    children,
}) => {
    const suspenseErrorMessage = 'Promise leaked to GlobalProviders';

    return (
        <Suspense fallback={(
            <ErrorThrower message={suspenseErrorMessage}/>
        )}>
            {children}
        </Suspense>
    );
};