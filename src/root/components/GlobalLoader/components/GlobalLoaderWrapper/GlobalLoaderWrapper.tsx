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
    const { areAllModulesLoaded } = LazyModules.useContext();
    const disableTimeoutIdRef = useRef<number>();

    const disable = useFunction(() => {
        clearTimeout(disableTimeoutIdRef.current);
        // const id = Math.random();
        // console.log(`QUEUE STATE CLOSE: ${id}`);
        disableTimeoutIdRef.current = setTimeout(() => {
            // console.log(`STATE CLOSE: ${id}`);
            controls.close();
        }, 200);
    });

    const enable = useFunction(() => {
        clearTimeout(disableTimeoutIdRef.current);

        // console.log('STATE OPEN');
        controls.open();
    });

    // useEffect(() => {
    // console.log(`STATE IS: ${controls.isOpen}`);
    // }, [controls.isOpen]);

    const value: Types.Context = {
        isEnabled: controls.isOpen,
        enable,
        disable,
    };

    return (
        <GlobalLoaderContext.Provider value={value}>
            <If condition={areAllModulesLoaded}>
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