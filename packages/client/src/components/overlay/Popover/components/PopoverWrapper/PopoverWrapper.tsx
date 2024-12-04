import { FC } from 'react';
import { cn, createStyles } from '@utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import ReactFocusLock from 'react-focus-lock';
import { useClickOutside, useContextProxy } from '@lesnoypudge/utils-react';
import { PopoverContext } from '../../context';
import { Overlay } from '@components/overlay/Overlay';
import { useKeyBind } from '@hooks';
import { KEY } from '@lesnoypudge/utils';



const styles = createStyles({
    lock: 'size-full',
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

    useKeyBind(wrapperRefManager, [KEY.Escape], handleEscape);

    return (
        <ReactFocusLock
            className={cn(styles.lock, className)}
            returnFocus
            autoFocus={focused}
            disabled={isLockDisabled}
        >
            {children}
        </ReactFocusLock>
    );
};