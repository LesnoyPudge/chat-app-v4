import { Overlay, RelativelyPositioned } from '@/components';
import { cn, createStyles } from '@/utils';
import { useTooltip, useTooltipAnimation } from './hooks';
import { useRefManager } from '@lesnoypudge/utils-react';
import { Types } from './types';
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

export const Tooltip: FC<Types.Node.Props> = ({
    className = '',
    leaderElementRef,
    boundsSize = 20,
    centered = true,
    spacing = 20,
    swappableAlignment = true,
    unbounded = false,
    within = false,
    preferredAlignment,
    children,
}) => {
    const followerElementRef = useRefManager<HTMLDivElement>(null);

    const { controls } = useTooltip({
        leaderElementRef,
        within,
    });

    const { alignment } = RelativelyPositioned.useRelativePosition({
        followerElementRef,
        leaderElementOrRectRef: leaderElementRef,
        preferredAlignment,
        boundsSize,
        centered,
        spacing,
        swappableAlignment,
        unbounded,
    });

    const {
        onEnter,
        onExit,
        style,
        progress,
    } = useTooltipAnimation(alignment);

    return (
        <Overlay.BaseOverlay.Provider
            controls={controls}
            progress={progress}
            onEnter={onEnter}
            onExit={onExit}
        >
            <Overlay.BaseOverlay.Wrapper>
                <div
                    className={RelativelyPositioned.Styles.wrapper}
                    ref={followerElementRef}
                >
                    <Motion.div
                        className={cn(styles.base, className)}
                        role='tooltip'
                        ref={followerElementRef}
                        style={style}
                    >
                        {children}
                    </Motion.div>
                </div>
            </Overlay.BaseOverlay.Wrapper>
        </Overlay.BaseOverlay.Provider>
    );
};