import { Overlay, RelativelyPositioned } from '@/components';
import { cn, createStyles, createVariants } from '@/utils';
import { useTooltip } from './useTooltip';
import {
    createWithDecorator,
    useRefManager,
    withDisplayName,
} from '@lesnoypudge/utils-react';
import { Types } from './types';
import { decorate } from '@lesnoypudge/macro';
import { FC } from 'react';
import { Motion } from '@/libs';



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

const { withDecorator } = createWithDecorator<
    Pick<Types.Node.Props, 'within' | 'leaderElementRef'>
>(({
    within = false,
    leaderElementRef,
    children,
}) => {
    const { controls } = useTooltip({
        leaderElementRef,
        within,
    });

    return (
        <Overlay.BaseOverlay.Provider controls={controls}>
            <Overlay.BaseOverlay.Wrapper>
                {children}
            </Overlay.BaseOverlay.Wrapper>
        </Overlay.BaseOverlay.Provider>
    );
});

decorate(withDisplayName, 'Tooltip', decorate.target);

export const Tooltip: FC<Types.Node.Props> = withDecorator(({
    className = '',
    leaderElementRef,
    boundsSize = 20,
    centered = true,
    spacing = 20,
    swappableAlignment = true,
    unbounded = false,
    children,
    ...rest
}) => {
    const followerElementRef = useRefManager<HTMLDivElement>(null);

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
                <Motion.div
                    className={cn(styles.base, className)}
                    role='tooltip'
                    variants={variants}
                    initial={variants.hidden.key}
                    animate={variants.visible.key}
                    exit={variants.hidden.key}
                    custom={alignment}
                    ref={followerElementRef}
                >
                    {children}
                </Motion.div>
            )}
        </RelativelyPositioned.Node>
    );
});