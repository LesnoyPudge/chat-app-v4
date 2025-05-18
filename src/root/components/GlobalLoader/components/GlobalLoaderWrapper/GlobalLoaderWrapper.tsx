import { Overlay } from '@/components';
import { FC, PropsWithChildren, useRef } from 'react';
import { GlobalLoaderContext } from '../../context';
import { Motion } from '@/libs';
import { GlobalLoaderScreen } from '@/router/screens/bundled';
import { Types } from '../../types';
import { LazyModules } from '@/root/components';
import { useFunction } from '@lesnoypudge/utils-react';
import { AnimationPresets } from '@/entities';
import { useMotionValue, useTransform } from 'motion/react';



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

    const progress = useMotionValue(2);
    const { onEnter, onExit, style } = AnimationPresets.useCustom({
        progress,
        style: {
            opacity: useTransform(progress, [0, 1, 2], [0, 1, 1]),
            scale: useTransform(progress, [0, 1, 2], [1.5, 1, 1]),
        },
    });

    return (
        <GlobalLoaderContext.Provider value={value}>
            <If condition={isLoaded}>
                {children}
            </If>

            <Overlay.BaseOverlay.Provider
                controls={controls}
                progress={progress}
                onEnter={onEnter}
                onExit={onExit}
            >
                <Overlay.Popover.Provider
                    focused
                    blockable
                    blocking
                >
                    <Overlay.BaseOverlay.Wrapper>
                        <Overlay.Popover.Wrapper>
                            <Motion.div style={style}>
                                <GlobalLoaderScreen/>
                            </Motion.div>
                        </Overlay.Popover.Wrapper>
                    </Overlay.BaseOverlay.Wrapper>
                </Overlay.Popover.Provider>
            </Overlay.BaseOverlay.Provider>
        </GlobalLoaderContext.Provider>
    );
};