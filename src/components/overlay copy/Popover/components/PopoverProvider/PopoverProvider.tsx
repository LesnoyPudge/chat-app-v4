import {
    useConst,
    ContextSelectable,
    useFunction,
} from '@lesnoypudge/utils-react';
import { PopoverContext } from '../../context';
import { FC, PropsWithChildren, useEffect } from 'react';
import { Overlay } from '@components';
import { createId } from '@lesnoypudge/utils';



export namespace PopoverProvider {
    export type Props = (
        PropsWithChildren
        & {
            focused?: boolean;
            blocking?: boolean;
            blockable?: boolean;
            closeOnEscape?: boolean;
            closeOnClickOutside?: boolean;
        }
    );
}

export const PopoverProvider: FC<PopoverProvider.Props> = ({
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
    const overlay = ContextSelectable.useSelector(Overlay.Context);

    const upperChildren = ContextSelectable.useSelector(
        PopoverContext,
        (v) => (v as PopoverContext | undefined)?.blockingChildren,
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
        if (!blockingChildren.size) return overlay.closeOverlay();
    });

    const handleEscape = useFunction(() => {
        if (!closeOnEscape) return;
        if (!overlay.isOverlayExist) return;
        if (!blockable) return overlay.closeOverlay();
        if (!blockingChildren.size) return overlay.closeOverlay();
    });

    const contextValue: PopoverContext = {
        ...overlay,
        blockingChildren,
        focused,
        handleClickOutside,
        handleEscape,
    };

    return (
        <PopoverContext.Provider value={contextValue}>
            {children}
        </PopoverContext.Provider>
    );
};