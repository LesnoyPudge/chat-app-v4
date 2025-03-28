import { ContextSelectable } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { cn, createStyles } from '@/utils';
import { Overlay } from '@/components';
import { Motion } from '@/libs';



const styles = createStyles({
    popover: 'relative',
    dialog: 'pointer-events-auto',
    backdrop: `
        pointer-events-auto 
        absolute
        inset-0 
        -z-10
        bg-black/70
    `,
});

export const DialogWrapper: FC<Overlay.Dialog.Types.Wrapper.Props> = ({
    className = '',
    children,
}) => {
    const {
        animationVariants,
        backdropAnimationVariants,
        label,
        withBackdrop,
        closeOverlay,
    } = ContextSelectable.useProxy(Overlay.Dialog.Context);

    return (
        <Overlay.BaseOverlay.Wrapper>
            <Overlay.Popover.Wrapper className={styles.popover}>
                <If condition={withBackdrop}>
                    <Motion.div
                        className={styles.backdrop}
                        variants={backdropAnimationVariants}
                        initial={backdropAnimationVariants?.initial.key}
                        animate={backdropAnimationVariants?.animate.key}
                        exit={backdropAnimationVariants?.exit.key}
                        onClick={closeOverlay}
                    >
                    </Motion.div>
                </If>

                <Motion.div
                    className={cn(styles.dialog, className)}
                    role='dialog'
                    aria-label={label}
                    variants={animationVariants}
                    initial={animationVariants?.initial.key}
                    animate={animationVariants?.animate.key}
                    exit={animationVariants?.exit.key}
                >
                    {children}
                </Motion.div>
            </Overlay.Popover.Wrapper>
        </Overlay.BaseOverlay.Wrapper>
    );
};