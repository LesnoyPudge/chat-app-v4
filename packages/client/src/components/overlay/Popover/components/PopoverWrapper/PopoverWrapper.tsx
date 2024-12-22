import { FC } from 'react';
import { cn, createStyles } from '@utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Focus, useClickOutside, useContextProxy } from '@lesnoypudge/utils-react';
import { PopoverContext } from '../../context';
import { Overlay } from '@components';
import { useHotKey } from '@hooks';
import { KEY } from '@lesnoypudge/utils';



const styles = createStyles({
    lock: 'size-full overflow-hidden',
});

export namespace PopoverWrapper {
    export type Props = RT.PropsWithChildrenAndClassName;
}

export const PopoverWrapper: FC<PopoverWrapper.Props> = ({
    className = '',
    children,
}) => {
    const {
        isOverlayExist,
        wrapperRefManager,
    } = useContextProxy(Overlay.Context);
    const {
        focused,
        handleClickOutside,
        handleEscape,
    } = useContextProxy(PopoverContext);

    const isLockDisabled = !focused || !isOverlayExist;

    useClickOutside(wrapperRefManager, handleClickOutside);

    useHotKey(document, [KEY.Escape], handleEscape);

    return (
        <Focus.Lock
            className={cn(styles.lock, className)}
            returnFocus
            autoFocus={focused}
            disabled={isLockDisabled}
        >
            {children}
        </Focus.Lock>
    );
};