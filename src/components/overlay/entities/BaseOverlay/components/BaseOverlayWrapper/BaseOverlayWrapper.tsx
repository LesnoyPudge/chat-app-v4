import { FC, PropsWithChildren } from 'react';
import { cn, createStyles, getHTMLElement } from '@/utils';
import { createPortal } from 'react-dom';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { AnimatePresence } from 'motion/react';
import { Overlay } from '@/components';



const styles = createStyles({
    wrapper: `
        pointer-events-none
        fixed
        inset-0
    `,
});

const PortalToOverlayLayer: FC<PropsWithChildren> = ({ children }) => {
    return createPortal(children, getHTMLElement.overlayRoot);
};

export const BaseOverlayWrapper: FC<Overlay.BaseOverlay.Types.Wrapper.Props> = ({
    className = '',
    children,
}) => {
    const {
        portalRefManager,
        isOverlayExist,
    } = ContextSelectable.useProxy(Overlay.BaseOverlay.Context);

    return (
        <AnimatePresence>
            <If condition={isOverlayExist}>
                <PortalToOverlayLayer>
                    <div
                        className={cn(styles.wrapper, className)}
                        ref={portalRefManager}
                    >
                        {children}
                    </div>
                </PortalToOverlayLayer>
            </If>
        </AnimatePresence>
    );
};