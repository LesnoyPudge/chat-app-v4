import { Overlay, RelativelyPositioned } from '@components';
import { cn, createStyles, createVariants } from '@utils';
import { useTooltip } from './useTooltip';
import {
    createWithDecorator,
    useRefManager,
    withDisplayName,
} from '@lesnoypudge/utils-react';
import { m } from 'motion/react';
import { Types } from './types';



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

const variants = createVariants({
    hidden: (
        alignment: RelativelyPositioned.useRelativePosition.Alignment,
    ) => ({
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
});

const { withDecorator } = createWithDecorator(({ children }) => {
    return (
        <Overlay.BaseOverlay.Provider>
            <Overlay.BaseOverlay.Wrapper>
                {children}
            </Overlay.BaseOverlay.Wrapper>
        </Overlay.BaseOverlay.Provider>
    );
});

export const Tooltip = withDecorator(withDisplayName('Tooltip', ({
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
}: Types.Node.Props) => {
    const followerElementRef = useRefManager<HTMLDivElement>(null);

    useTooltip({
        leaderElementRef,
        within,
    });

    return (
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
    );
}));