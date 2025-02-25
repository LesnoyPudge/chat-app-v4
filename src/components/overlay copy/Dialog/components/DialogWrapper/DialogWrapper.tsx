import { ContextSelectable } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { DialogContext } from '../../context';
import { PropsWithChildrenAndClassName } from '@lesnoypudge/types-utils-react';
import { Overlay, Popover } from '@components';
import { m } from 'motion/react';
import { cn, createStyles } from '@utils';



const styles = createStyles({
    dialog: 'pointer-events-auto h-dvh w-dvw',
    backdrop: `
        absolute 
        inset-0
        -z-10 
        bg-black/70
    `,
    withPointer: 'pointer-events-auto',
    withoutPointer: 'pointer-events-none',
});

export namespace DialogWrapper {
    export type Props = PropsWithChildrenAndClassName;
}

export const DialogWrapper: FC<DialogWrapper.Props> = ({
    className = '',
    children,
}) => {
    const {
        animationVariants,
        backdropAnimationVariants,
        label,
        withBackdrop,
        withoutBackdropPointerEvents,
        closeOverlay,
    } = ContextSelectable.useProxy(DialogContext);

    const backdropPointerClass = (
        withoutBackdropPointerEvents
            ? styles.withoutPointer
            : styles.withPointer
    );

    return (
        <Overlay.Wrapper>
            <Popover.Wrapper>
                <If condition={withBackdrop}>
                    <m.div
                        className={cn(
                            styles.backdrop,
                            backdropPointerClass,
                        )}
                        variants={backdropAnimationVariants}
                        initial={backdropAnimationVariants.initial.key}
                        animate={backdropAnimationVariants.animate.key}
                        exit={backdropAnimationVariants.exit.key}
                        onClick={closeOverlay}
                    >
                    </m.div>
                </If>

                <m.div
                    className={cn(styles.dialog, className)}
                    role='dialog'
                    aria-label={label}
                    variants={animationVariants}
                    initial={animationVariants.initial.key}
                    animate={animationVariants.animate.key}
                    exit={animationVariants.exit.key}
                >
                    {children}
                </m.div>
            </Popover.Wrapper>
        </Overlay.Wrapper>
    );
};