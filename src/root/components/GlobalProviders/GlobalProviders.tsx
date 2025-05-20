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
import { LazyModules, WithLazySVGResources } from '@/root/components';
import { LayoutType } from '@/components';
import { decorate } from '@lesnoypudge/macro';
import { env } from '@/vars';



const store = Store.Utils.setupStore();

const loadDomAnimation = async () => {
    return await import('./lazy/lazyDomAnimations').then((v) => v.default);
};

const {
    withDecorator: withFirstDecorator,
} = createWithDecorator(({ children }) => (
    <Heading.Provider startFrom={2}>
        <ReduxReact.Provider store={store}>
            <LazyModules.Provider>
                <WithLazySVGResources>
                    <LazyMotion features={loadDomAnimation} strict>
                        <MotionConfig reducedMotion='user'>
                            <BrowserRouter
                                basename={`${env._PUBLIC_BASE_URL}/`}
                            >
                                {children}
                            </BrowserRouter>
                        </MotionConfig>
                    </LazyMotion>
                </WithLazySVGResources>
            </LazyModules.Provider>
        </ReduxReact.Provider>
    </Heading.Provider>
));


const {
    withDecorator: withSecondDecorator,
} = createWithDecorator(({ children }) => (
    <Navigator.Provider>
        <LayoutType.Provider>
            {children}
        </LayoutType.Provider>
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