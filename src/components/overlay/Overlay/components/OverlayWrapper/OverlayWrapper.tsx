import { FC, PropsWithChildren } from 'react';
import { cn, createStyles, getHTMLElement } from '@utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { createPortal } from 'react-dom';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { OverlayContext } from '../../context';



const styles = createStyles({
    wrapper: `
        pointer-events-none
        fixed
        inset-0
    `,
});

const { overlayRoot } = getHTMLElement;

const OverlayPortal: FC<PropsWithChildren> = ({ children }) => {
    return createPortal(children, overlayRoot);
};

export namespace OverlayWrapper {
    export type Props = RT.PropsWithChildrenAndClassName;
}

export const OverlayWrapper: FC<OverlayWrapper.Props> = ({
    className = '',
    children,
}) => {
    const { portalRefManager } = ContextSelectable.useProxy(OverlayContext);

    return (
        <OverlayPortal>
            <div
                className={cn(styles.wrapper, className)}
                ref={portalRefManager}
            >
                {children}
            </div>
        </OverlayPortal>
    );
};