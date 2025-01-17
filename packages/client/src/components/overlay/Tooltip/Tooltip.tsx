import { Overlay, RelativelyPositioned } from '@components';
import { cn, createStyles } from '@utils';
import { useTooltip } from './hooks';
import { useRefManager } from '@lesnoypudge/utils-react';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { m, Variants } from 'motion/react';



import Alignment = RelativelyPositioned.useRelativePosition.Alignment;

const styles = createStyles({
    base: `
        w-max 
        max-w-[min(300px,100dvw)] 
        rounded-md 
        bg-primary-500 
        px-2.5 
        py-[5px] 
        font-bold 
        text-color-base 
        shadow-elevation-low
    `,
});

const variants = {
    hidden: (alignment: Alignment) => ({
        opacity: 0,
        translateY: (
            alignment === 'top'
                ? -15
                : alignment === 'bottom'
                    ? 15
                    : 0

        ),
        translateX: (
            alignment === 'left'
                ? -15
                : alignment === 'right'
                    ? 15
                    : 0

        ),
        transition: {
            duration: 0.15,
        },
    }),
    visible: () => ({
        opacity: 1,
        translateX: 0,
        translateY: 0,
        transition: {
            duration: 0.15,
        },
    }),
} satisfies Variants;

export namespace Tooltip {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & RelativelyPositioned.useRelativePosition.Options
        & useTooltip.Props
    );
}

export const Tooltip = Overlay.withProvider(({
    className = '',
    leaderElementRef,
    boundsSize = 20,
    centered = true,
    spacing = 20,
    swappableAlignment = true,
    within = false,
    unbounded = false,
    children,
    ...rest
}: Tooltip.Props) => {
    const followerElementRef = useRefManager<HTMLDivElement>(null);

    useTooltip({
        leaderElementRef,
        within,
    });

    return (
        <Overlay.Presence>
            <Overlay.Wrapper>
                <RelativelyPositioned.Node
                    leaderElementOrRectRef={leaderElementRef}
                    boundsSize={boundsSize}
                    centered={centered}
                    spacing={spacing}
                    swappableAlignment={swappableAlignment}
                    unbounded={unbounded}
                    {...rest}
                >
                    {({ alignment }) => (
                        <m.div
                            className={cn(styles.base, className)}
                            role='tooltip'
                            variants={variants}
                            initial='hidden'
                            animate='visible'
                            exit='hidden'
                            custom={alignment}
                            ref={followerElementRef}
                        >
                            {children}
                        </m.div>
                    )}
                </RelativelyPositioned.Node>
            </Overlay.Wrapper>
        </Overlay.Presence>
    );
});