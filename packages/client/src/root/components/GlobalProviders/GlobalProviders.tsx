import { Heading } from '@lesnoypudge/utils-react';
import { LazyMotion, MotionConfig } from 'motion/react';
import { FC, PropsWithChildren } from 'react';



const loadDomAnimation = () => {
    return import('./common/lazyDomAnimations').then((res) => {
        return res.default;
    });
};

export const GlobalProviders: FC<PropsWithChildren> = ({
    children,
}) => {
    return (
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
    );
};