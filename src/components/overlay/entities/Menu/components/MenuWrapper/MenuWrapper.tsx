import { Overlay, RelativelyPositioned } from '@/components';
import { Motion } from '@/libs';
import { cn, createStyles, getAnimationVariants } from '@/utils';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { FC } from 'react';



const {
    animationVariants: defaultMenuVariants,
} = getAnimationVariants.popoverMenu();

const styles = createStyles({
    content: 'pointer-events-auto',
});

export const MenuWrapper: FC<Overlay.Menu.Types.Wrapper.Props> = ({
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
    } = ContextSelectable.useProxy(Overlay.Menu.Context);

    return (
        <Overlay.BaseOverlay.Wrapper>
            <Overlay.Popover.Wrapper>
                <RelativelyPositioned.Node
                    leaderElementOrRectRef={leaderElementOrRectRef}
                    preferredAlignment={preferredAlignment}
                    spacing={spacing}
                    centered={centered}
                    swappableAlignment
                >
                    <Motion.div
                        className={cn(styles.content, className)}
                        role='menu'
                        aria-label={label}
                        variants={animationVariants}
                        initial={animationVariants.initial.key}
                        animate={animationVariants.animate.key}
                        exit={animationVariants.exit.key}
                    >
                        {children}
                    </Motion.div>
                </RelativelyPositioned.Node>
            </Overlay.Popover.Wrapper>
        </Overlay.BaseOverlay.Wrapper>
    );
};