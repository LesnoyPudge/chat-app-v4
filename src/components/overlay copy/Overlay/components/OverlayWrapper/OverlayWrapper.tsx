import { FC, PropsWithChildren } from 'react';
import { cn, createStyles, getHTMLElement } from '@utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { createPortal } from 'react-dom';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { OverlayContext } from '../../context';
import { AnimatePresence } from 'motion/react';



const styles = createStyles({
    wrapper: `
        pointer-events-none
        fixed
        inset-0
    `,
});

const OverlayPortal: FC<PropsWithChildren> = ({ children }) => {
    return createPortal(children, getHTMLElement.overlayRoot);
};

export namespace OverlayWrapper {
    export type Props = RT.PropsWithChildrenAndClassName;
}

export const OverlayWrapper: FC<OverlayWrapper.Props> = ({
    className = '',
    children,
}) => {
    const {
        portalRefManager,
        isOverlayExist,
    } = ContextSelectable.useProxy(OverlayContext);

    return (
        <AnimatePresence>
            <If condition={isOverlayExist}>
                <OverlayPortal>
                    <div
                        className={cn(styles.wrapper, className)}
                        ref={portalRefManager}
                    >
                        {children}
                    </div>
                </OverlayPortal>
            </If>
        </AnimatePresence>
    );
};