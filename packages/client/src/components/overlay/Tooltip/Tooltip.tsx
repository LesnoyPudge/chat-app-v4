import { Overlay, RelativelyPositioned } from '@components';
import { cn, createStyles } from '@utils';
import { ComponentRef, FC } from 'react';
import { useTooltip } from './hooks';
import { useContextProxy, useRefManager } from '@lesnoypudge/utils-react';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { AnimatePresence, m, Variants } from 'motion/react';



import Alignment = RelativelyPositioned.useRelativePosition.Alignment;

const styles = createStyles({
    base: `
        w-max 
        max-w-[300px] 
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

const withOverlayProvider = (Component: typeof Tooltip) => {
    const Decorated = (props: Tooltip.Props) => {
        return (
            <Overlay.Provider>
                <Component {...props}/>
            </Overlay.Provider>
        );
    };

    return Decorated;
};

export namespace Tooltip {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & RelativelyPositioned.useRelativePosition.Options
        & useTooltip.Props
    );
}

export const Tooltip: FC<Tooltip.Props> = withOverlayProvider(({
    className = '',
    leaderElementRef,
    boundsSize = 20,
    centered = true,
    spacing = 20,
    swappableAlignment = true,
    within = false,
    children,
    ...rest
}) => {
    const { isOverlayExist } = useContextProxy(Overlay.Context);
    const followerElementRef = useRefManager<ComponentRef<'div'>>(null);

    useTooltip({
        leaderElementRef,
        within,
    });

    return (
        <AnimatePresence>
            <If condition={isOverlayExist}>
                <Overlay.Wrapper>
                    <RelativelyPositioned.Node
                        leaderElementOrRectRef={leaderElementRef}
                        boundsSize={boundsSize}
                        centered={centered}
                        spacing={spacing}
                        swappableAlignment={swappableAlignment}
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
            </If>
        </AnimatePresence>
    );
});