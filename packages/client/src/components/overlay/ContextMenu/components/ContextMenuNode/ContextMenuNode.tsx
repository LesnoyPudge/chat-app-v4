import { PropsWithChildren } from 'react';
import { Popover, RelativelyPositioned, Overlay } from '@components';
import { useContextMenu } from './hooks';
import { createVariants, createWithDecorator } from '@utils';
import { withDisplayName } from '@lesnoypudge/utils-react';
import { ContextMenuProvider } from '../ContextMenuProvider';
import { m } from 'motion/react';



const variants = createVariants({
    hidden: {
        scale: 0.95,
        opacity: 0,
    },
    visible: {
        scale: 1,
        opacity: 1,
    },
});

const decorated = createWithDecorator(({ children }) => {
    return (
        <ContextMenuProvider>
            {children}
        </ContextMenuProvider>
    );
});

export namespace ContextMenuNode {
    export type Props = (
        PropsWithChildren
        & Pick<
            RelativelyPositioned.useRelativePosition.Options,
            'preferredAlignment'
        >
        & {
            leaderElementRef: (
                RelativelyPositioned.useRelativePosition.LeaderElementRef
            );
        }
    );
}

export const ContextMenuNode = withDisplayName('ContextMenuNode', decorated(({
    preferredAlignment,
    leaderElementRef,
    children,
}: ContextMenuNode.Props) => {
    const { leaderElementOrRectRef } = useContextMenu({
        leaderElementRef,
    });

    return (
        <Overlay.Presence>
            <Overlay.Wrapper>
                <Popover.Wrapper>
                    <RelativelyPositioned.Node
                        leaderElementOrRectRef={leaderElementOrRectRef}
                        preferredAlignment={preferredAlignment}
                        spacing={15}
                        boundsSize={20}
                        swappableAlignment
                    >
                        <m.div
                            variants={variants}
                            initial={variants.hidden.key}
                            animate={variants.visible.key}
                            exit={variants.hidden.key}
                        >
                            {children}
                        </m.div>
                    </RelativelyPositioned.Node>
                </Popover.Wrapper>
            </Overlay.Wrapper>
        </Overlay.Presence>
    );
}));