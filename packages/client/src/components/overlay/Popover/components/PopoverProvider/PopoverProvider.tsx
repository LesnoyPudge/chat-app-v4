import {
    useConst,
    useContextProxy,
    useContextSelector,
    useFunction,
} from '@lesnoypudge/utils-react';
import { PopoverContext } from '../../context';
import { FC, PropsWithChildren, useEffect } from 'react';
import { Overlay } from '@components';
import { getId } from '@lesnoypudge/utils';



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
    focused = false,
    // is popover able to be blocked by popover children
    blockable = false,
    closeOnClickOutside = false,
    closeOnEscape = false,
    children,
}) => {
    const id = useConst(() => getId());
    const blockingChildren = useConst(() => new Set<string>());
    const {
        isOverlayExist,
        wrapperRefManager,
        closeOverlay,
    } = useContextProxy(Overlay.Context);

    const upperChildren = useContextSelector(
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blocking, upperChildren]);

    const handleClickOutside = useFunction(() => {
        if (!closeOnClickOutside) return;
        if (!isOverlayExist) return;
        if (!wrapperRefManager.current) return;
        if (!blockingChildren.size) return closeOverlay();
    });

    const handleEscape = useFunction(() => {
        if (!closeOnEscape) return;
        if (!isOverlayExist) return;
        if (!wrapperRefManager.current) return;
        if (!blockable) return closeOverlay();
        if (!blockingChildren.size) return closeOverlay();
    });

    const contextValue: PopoverContext = {
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