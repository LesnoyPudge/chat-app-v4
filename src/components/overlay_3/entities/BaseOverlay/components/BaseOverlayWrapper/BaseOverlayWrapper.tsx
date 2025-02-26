import { FC, PropsWithChildren } from 'react';
import { cn, createStyles, getHTMLElement } from '@utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { createPortal } from 'react-dom';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { BaseOverlayContext } from '../../context';
import { AnimatePresence } from 'motion/react';



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

export namespace BaseOverlayWrapper {
    export type Props = RT.PropsWithChildrenAndClassName;
}

export const BaseOverlayWrapper: FC<BaseOverlayWrapper.Props> = ({
    className = '',
    children,
}) => {
    const {
        portalRefManager,
        isOverlayExist,
    } = ContextSelectable.useProxy(BaseOverlayContext);

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