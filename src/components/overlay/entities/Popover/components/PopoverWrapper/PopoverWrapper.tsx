/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC } from 'react';
import { cn, createStyles, getHTMLElement } from '@/utils';
import { Focus, ContextSelectable } from '@lesnoypudge/utils-react';
import { Overlay } from '@/components';



const styles = createStyles({
    lock: 'relative h-dvh w-dvw overflow-hidden',
    clickProtector: 'pointer-events-auto absolute inset-0 -z-10',
});

const visibleElements = [getHTMLElement.H1];

export const PopoverWrapper: FC<Overlay.Popover.Types.Wrapper.Props> = ({
    className = '',
    clickProtectorClassName = '',
    children,
}) => {
    const {
        focused,
        handleClickOutside,
        handleEscape,
        closeOverlay,
    } = ContextSelectable.useProxy(Overlay.Popover.Context);

    return (
        <Focus.Lock
            className={cn(styles.lock, className)}
            returnFocus
            autoFocus={focused}
            enabled={focused}
            focusLock
            shards={visibleElements}
            preventScrollOnFocus
            scrollLock
            onClickOutside={handleClickOutside}
            onEscapeKey={handleEscape}
        >
            <If condition={focused}>
                <div
                    className={cn(
                        styles.clickProtector,
                        clickProtectorClassName,
                    )}
                    onClick={closeOverlay}
                    onContextMenu={closeOverlay}
                    onAuxClick={closeOverlay}
                >
                </div>
            </If>

            {children}
        </Focus.Lock>
    );
};