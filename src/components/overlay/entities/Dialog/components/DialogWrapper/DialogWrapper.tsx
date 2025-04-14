import { ContextSelectable } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { cn, createStyles } from '@/utils';
import { Overlay } from '@/components';
import { Motion } from '@/libs';



const styles = createStyles({
    popover: 'relative',
    withPointer: 'pointer-events-auto',
    withoutPointer: 'pointer-events-none',
    backdrop: `
        absolute
        inset-0 
        -z-10
        bg-black/70
    `,
    contentWrapper: 'absolute inset-0',
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
        withoutPointerEvents,
        closeOverlay,
    } = ContextSelectable.useProxy(Overlay.Dialog.Context);

    return (
        <Overlay.BaseOverlay.Wrapper>
            <Overlay.Popover.Wrapper
                className={styles.popover}
                clickProtectorClassName={cn(
                    withoutPointerEvents && styles.withoutPointer,
                )}
            >
                <If condition={withBackdrop}>
                    <Motion.div
                        className={cn(
                            styles.backdrop,
                            withoutPointerEvents && styles.withoutPointer,
                            !withoutPointerEvents && styles.withPointer,
                        )}
                        variants={backdropAnimationVariants}
                        initial={backdropAnimationVariants?.initial.key}
                        animate={backdropAnimationVariants?.animate.key}
                        exit={backdropAnimationVariants?.exit.key}
                        onClick={closeOverlay}
                    >
                    </Motion.div>
                </If>

                <Motion.div
                    className={styles.contentWrapper}
                    variants={animationVariants}
                    initial={animationVariants?.initial.key}
                    animate={animationVariants?.animate.key}
                    exit={animationVariants?.exit.key}
                >
                    <div
                        className={cn(
                            withoutPointerEvents && styles.withoutPointer,
                            !withoutPointerEvents && styles.withPointer,
                            className,
                        )}
                        role='dialog'
                        aria-label={label}
                    >
                        {children}
                    </div>
                </Motion.div>
            </Overlay.Popover.Wrapper>
        </Overlay.BaseOverlay.Wrapper>
    );
};