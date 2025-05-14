import { FC } from 'react';
import { DialogContext } from '../../context';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Overlay } from '@/components';



export const DialogProvider: FC<Overlay.Dialog.Types.Provider.Props> = ({
    children,
    controls,
    withBackdrop = false,
    withoutPointerEvents = false,
    label,
    progress,
    backdropStyle,
    onEnter,
    onExit,
    dialogStyle,
}) => {
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
                    {(popover) => {
                        const value = {
                            ...popover,
                            withBackdrop,
                            withoutPointerEvents,
                            label,
                            backdropStyle,
                            onEnter,
                            onExit,
                            dialogStyle,
                            progress,
                        } as Overlay.Dialog.Types.Context;

                        return (
                            <DialogContext.Provider value={value}>
                                {children}
                            </DialogContext.Provider>
                        );
                    }}
                </ContextSelectable.ConsumerSelector>
            </Overlay.Popover.Provider>
        </Overlay.BaseOverlay.Provider>
    );
};