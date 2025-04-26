import { Overlay } from '@/components';
import { FC, PropsWithChildren, useRef } from 'react';
import { GlobalLoaderContext } from '../../context';
import { getAnimationVariants } from '@/utils';
import { Motion } from '@/libs';
import { GlobalLoaderScreen } from '@/router/screens/bundled';
import { Types } from '../../types';
import { LazyModules } from '@/root/components';
import { useFunction } from '@lesnoypudge/utils-react';



const { animationVariants } = getAnimationVariants.custom({
    initial: {
        opacity: 1,
        scale: 1,
    },
    animate: {},
    exit: {
        opacity: 0,
        scale: 1.5,
    },
});

export const GlobalLoaderWrapper: FC<PropsWithChildren> = ({
    children,
}) => {
    const controls = Overlay.useControls(true);
    const { isLoaded } = LazyModules.useContext();
    const disableTimeoutIdRef = useRef<number>();

    const disable = useFunction(() => {
        clearTimeout(disableTimeoutIdRef.current);

        disableTimeoutIdRef.current = setTimeout(() => {
            controls.close();
        }, 200);
    });

    const enable = useFunction(() => {
        clearTimeout(disableTimeoutIdRef.current);

        controls.open();
    });

    const value: Types.Context = {
        isEnabled: controls.isOpen,
        enable,
        disable,
    };

    return (
        <GlobalLoaderContext.Provider value={value}>
            <If condition={isLoaded}>
                {children}
            </If>

            <Overlay.BaseOverlay.Provider controls={controls}>
                <Overlay.Popover.Provider
                    focused
                    blockable
                    blocking
                >
                    <Overlay.BaseOverlay.Wrapper>
                        <Overlay.Popover.Wrapper>
                            <Motion.div
                                variants={animationVariants}
                                initial={animationVariants.initial.key}
                                animate={animationVariants.animate.key}
                                exit={animationVariants.exit.key}
                            >
                                <GlobalLoaderScreen/>
                            </Motion.div>
                        </Overlay.Popover.Wrapper>
                    </Overlay.BaseOverlay.Wrapper>
                </Overlay.Popover.Provider>
            </Overlay.BaseOverlay.Provider>
        </GlobalLoaderContext.Provider>
    );
};