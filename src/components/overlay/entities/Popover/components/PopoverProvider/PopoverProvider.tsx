import {
    useConst,
    ContextSelectable,
    useFunction,
} from '@lesnoypudge/utils-react';
import { FC, useEffect } from 'react';
import { createId } from '@lesnoypudge/utils';
import { Overlay } from '@/components';



export const PopoverProvider: FC<Overlay.Popover.Types.Provider.Props> = ({
    // is popover block its popover parent
    blocking = false,
    // is popover able to be blocked by popover children
    blockable = false,
    focused = false,
    closeOnClickOutside = false,
    closeOnEscape = false,
    children,
}) => {
    const id = useConst(() => createId());
    const blockingChildren = useConst(() => new Set<string>());
    const overlay = ContextSelectable.useSelector(
        Overlay.BaseOverlay.Context,
    );

    const upperChildren = ContextSelectable.useSelector(
        Overlay.Popover.Context,
        (v) => (v as Overlay.Popover.Types.Context | undefined)?.blockingChildren,
    );

    useEffect(() => {
        if (!blocking) return;
        if (!upperChildren) return;

        upperChildren.add(id);

        return () => {
            upperChildren.delete(id);
        };
    }, [blocking, id, upperChildren]);

    const handleClickOutside = useFunction(() => {
        if (!closeOnClickOutside) return;
        if (!overlay.isOverlayExist) return;
        if (!overlay.portalRefManager.current) return;
        if (blockingChildren.size) return;

        overlay.closeOverlay();
    });

    const handleEscape = useFunction(() => {
        if (!closeOnEscape) return;
        if (!overlay.isOverlayExist) return;
        if (!blockable) return overlay.closeOverlay();
        if (blockingChildren.size) return;

        overlay.closeOverlay();
    });

    const contextValue: Overlay.Popover.Types.Context = {
        ...overlay,
        blockingChildren,
        focused,
        handleClickOutside,
        handleEscape,
    };

    return (
        <Overlay.Popover.Context.Provider value={contextValue}>
            {children}
        </Overlay.Popover.Context.Provider>
    );
};