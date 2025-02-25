import { Popover, RelativelyPositioned, Overlay } from '@components';
import { getAnimationVariants } from '@utils';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { m } from 'motion/react';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { ContextMenuContext } from '../../context';
import { FC } from 'react';



const { animationVariants } = getAnimationVariants.popoverMenu();

export namespace ContextMenuWrapper {
    export type Props = RT.PropsWithChildrenAndClassName;
}

export const ContextMenuWrapper: FC<ContextMenuWrapper.Props> = ({
    className = '',
    children,
}) => {
    const {
        leaderElementOrRectRef,
        preferredAlignment,
        spacing,
        label,
    } = ContextSelectable.useProxy(ContextMenuContext);

    return (
        <Overlay.Wrapper>
            <Popover.Wrapper>
                <RelativelyPositioned.Node
                    leaderElementOrRectRef={leaderElementOrRectRef}
                    preferredAlignment={preferredAlignment}
                    spacing={spacing}
                    swappableAlignment
                >
                    <m.div
                        className={className}
                        role='menu'
                        aria-label={label}
                        variants={animationVariants}
                        initial={animationVariants.initial.key}
                        animate={animationVariants.animate.key}
                        exit={animationVariants.exit.key}
                    >
                        {children}
                    </m.div>
                </RelativelyPositioned.Node>
            </Popover.Wrapper>
        </Overlay.Wrapper>
    );
};