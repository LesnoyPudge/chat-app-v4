import { useContextProxy } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { DialogContext } from '../../context';
import { PropsWithChildrenAndClassName } from '@lesnoypudge/types-utils-react';
import { Overlay, Popover } from '@components';
import { m } from 'motion/react';
import { cn, createStyles } from '@utils';



const styles = createStyles({
    dialog: 'relative size-full',
    backdrop: `
        absolute 
        inset-0
        -z-10 
        scale-[999]
        bg-black/70
    `,
    withPointer: 'pointer-events-auto',
    withoutPointer: 'pointer-events-none',
});

const getPointerStyle = (pointerDisabled: boolean) => {
    return pointerDisabled ? styles.withoutPointer : styles.withPointer;
};

export namespace DialogWrapper {
    export type Props = PropsWithChildrenAndClassName;
}

export const DialogWrapper: FC<DialogWrapper.Props> = ({
    className = '',
    children,
}) => {
    const {
        animationVariants,
        label,
        withBackdrop,
        withoutBackdropPointerEvents,
        closeOverlay,
    } = useContextProxy(DialogContext);

    return (
        <Overlay.Presence>
            <Overlay.Wrapper>
                <Popover.Wrapper>
                    <m.div
                        className={cn(styles.dialog, className)}
                        role='dialog'
                        aria-label={label}
                        variants={animationVariants}
                        initial={animationVariants.initial.key}
                        animate={animationVariants.animate.key}
                        exit={animationVariants.exit.key}
                    >
                        <If condition={withBackdrop}>
                            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
                            <div
                                className={cn(
                                    styles.backdrop,
                                    getPointerStyle(
                                        withoutBackdropPointerEvents,
                                    ),
                                )}
                                onClick={closeOverlay}
                            >
                            </div>
                        </If>

                        {children}
                    </m.div>
                </Popover.Wrapper>
            </Overlay.Wrapper>
        </Overlay.Presence>
    );
};