import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Overlay, Popover, RelativelyPositioned } from '@components';
import { PropsWithChildren } from 'react';



export type ContextMenuContext = (
    Popover.Context
    & PropsWithChildren
    & Pick<
        RelativelyPositioned.useRelativePosition.Options,
        'preferredAlignment' | 'spacing'
    >
    & {
        leaderElementOrRectRef: (
            RelativelyPositioned.useRelativePosition.LeaderElementOrRectRef
        );
        label: string;
    }
    & Overlay.Types.WithControls
);

export const ContextMenuContext = ContextSelectable.createContext<
    ContextMenuContext
>();