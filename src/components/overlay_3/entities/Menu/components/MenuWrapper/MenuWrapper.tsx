import { RelativelyPositioned } from '@components';
import { cn, createStyles, getAnimationVariants } from '@utils';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { m } from 'motion/react';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { MenuContext } from '../../context';
import { FC } from 'react';
import { BaseOverlay } from '../../../BaseOverlay';
import { Popover } from '../../../Popover';



const {
    animationVariants: defaultMenuVariants,
} = getAnimationVariants.popoverMenu();

const styles = createStyles({
    content: 'pointer-events-auto',
});

export namespace MenuWrapper {
    export type Props = RT.PropsWithChildrenAndClassName;
}

export const MenuWrapper: FC<MenuWrapper.Props> = ({
    className = '',
    children,
}) => {
    const {
        leaderElementOrRectRef,
        preferredAlignment,
        spacing,
        label,
        animationVariants = defaultMenuVariants,
        centered,
    } = ContextSelectable.useProxy(MenuContext);

    return (
        <BaseOverlay.Wrapper>
            <Popover.Wrapper>
                <RelativelyPositioned.Node
                    leaderElementOrRectRef={leaderElementOrRectRef}
                    preferredAlignment={preferredAlignment}
                    spacing={spacing}
                    centered={centered}
                    swappableAlignment
                >
                    <m.div
                        className={cn(styles.content, className)}
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
        </BaseOverlay.Wrapper>
    );
};