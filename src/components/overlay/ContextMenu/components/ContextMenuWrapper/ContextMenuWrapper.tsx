import { PropsWithChildren } from 'react';
import { Popover, RelativelyPositioned, Overlay } from '@components';
import { useContextMenu } from './hooks';
import { getAnimationVariants } from '@utils';
import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { ContextMenuProvider } from '../ContextMenuProvider';
import { m } from 'motion/react';



const { animationVariants } = getAnimationVariants.contextMenu();

const { withDecorator } = createWithDecorator(({ children }) => {
    return (
        <ContextMenuProvider>
            {children}
        </ContextMenuProvider>
    );
});

export namespace ContextMenuWrapper {
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

export const ContextMenuWrapper = withDisplayName(
    'ContextMenuWrapper',
    withDecorator(({
        preferredAlignment,
        leaderElementRef,
        children,
    }: ContextMenuWrapper.Props) => {
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
                            swappableAlignment
                        >
                            <m.div
                                variants={animationVariants}
                                initial={animationVariants.initial.key}
                                animate={animationVariants.animate.key}
                                exit={animationVariants.exit.key}
                            >
                                {children}
                            </m.div>
                        </RelativelyPositioned.Node>
                    </Popover.Wrapper>
                </Overlay.Wrapper>
            </Overlay.Presence>
        );
    }),
);