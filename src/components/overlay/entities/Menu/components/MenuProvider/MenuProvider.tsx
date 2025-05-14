import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Overlay } from '@/components';
import { MenuContext } from '../../context';
import { FC } from 'react';
import { AnimationPresets } from '@/entities';
import { useMotionValue } from 'motion/react';



export const MenuProvider: FC<Overlay.Menu.Types.Provider.Props> = ({
    controls,
    children,
    progress: _progress,
    onEnter: _onEnter,
    onExit: _onExit,
    style: _style,
    ...rest
}) => {
    const defaultProgress = useMotionValue(2);

    const progress = _progress ?? defaultProgress;

    const defaultAnimation = AnimationPresets.usePopoverMenu({
        progress: _progress ?? defaultProgress,
    });

    const onEnter = _progress ? _onEnter : defaultAnimation.onEnter;
    const onExit = _progress ? _onExit : defaultAnimation.onExit;
    const style = _progress ? _style : defaultAnimation.style;

    return (
        <Overlay.BaseOverlay.Provider
            controls={controls}
            progress={progress}
            onEnter={onEnter}
            onExit={onExit}
        >
            <Overlay.Popover.Provider
                blockable
                blocking
                closeOnClickOutside
                closeOnEscape
                focused
            >
                <ContextSelectable.ConsumerSelector
                    context={Overlay.Popover.Context}
                    selector={(v) => v}
                >
                    {(popover) => (
                        <MenuContext.Provider value={{
                            ...popover,
                            ...rest,
                            controls,
                            style,
                            progress,
                            onEnter,
                            onExit,
                        }}>
                            {children}
                        </MenuContext.Provider>
                    )}
                </ContextSelectable.ConsumerSelector>
            </Overlay.Popover.Provider>
        </Overlay.BaseOverlay.Provider>
    );
};