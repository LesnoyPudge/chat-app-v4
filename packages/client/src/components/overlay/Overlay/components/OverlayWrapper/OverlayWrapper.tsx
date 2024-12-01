import { FC } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { OverlayContext } from '../../context';
import { OverlayPortal } from './components';
import { cn, createStyles } from '@utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useContextProxy } from '@lesnoypudge/utils-react';



const styles = createStyles({
    wrapper: `
        pointer-events-none
        fixed
        inset-0
    `,
    inner: 'size-full',
});

export namespace OverlayWrapper {
    export type Props = RT.PropsWithChildrenAndClassName;
}

export const OverlayWrapper: FC<OverlayWrapper.Props> = ({
    className = '',
    children,
}) => {
    const { focused, isOverlayExist } = useContextProxy(OverlayContext);

    const isLockDisabled = !focused || !isOverlayExist;

    return (
        <OverlayPortal>
            <div className={cn(styles.wrapper, className)}>
                <ReactFocusLock
                    className={styles.inner}
                    returnFocus
                    autoFocus={focused}
                    disabled={isLockDisabled}
                >
                    {children}
                </ReactFocusLock>
            </div>
        </OverlayPortal>
    );
};