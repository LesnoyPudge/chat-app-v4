import { ContextSelectable } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { DialogContext } from '../../context';
import { PropsWithChildrenAndClassName } from '@lesnoypudge/types-utils-react';
import { Overlay, Popover } from '@components';
import { m } from 'motion/react';
import { cn, createStyles } from '@utils';
import { pick } from '@lesnoypudge/utils';



const styles = createStyles({
    dialog: 'size-full',
    backdrop: `
        absolute 
        inset-0
        -z-10 
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
    } = ContextSelectable.useProxy(DialogContext);

    const onlyWithOpacity = Object.fromEntries(
        Object.entries(animationVariants).map(([key, value]) => {
            if ('name' in value) return [key, value];

            const trimmed = pick(value, 'opacity', 'transition');

            return [key, trimmed];
        }),
    ) as typeof animationVariants;

    return (
        <Overlay.Presence>
            <Overlay.Wrapper>
                <Popover.Wrapper className='relative'>
                    <If condition={withBackdrop}>
                        { }
                        <m.div
                            variants={onlyWithOpacity}
                            initial={animationVariants.initial.key}
                            animate={animationVariants.animate.key}
                            exit={animationVariants.exit.key}
                            className={cn(
                                styles.backdrop,
                                getPointerStyle(
                                    withoutBackdropPointerEvents,
                                ),
                            )}
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
        </Overlay.Presence>
    );
};