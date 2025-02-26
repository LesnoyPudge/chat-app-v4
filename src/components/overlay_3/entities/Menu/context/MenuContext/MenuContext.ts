import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Overlay, RelativelyPositioned } from '@components';
import { PropsWithChildren } from 'react';
import { createVariants } from '@utils';
import { Popover } from '../../../Popover';



export type MenuContext = (
    Popover.Context
    & PropsWithChildren
    & Pick<
        RelativelyPositioned.useRelativePosition.Options,
        'preferredAlignment' | 'spacing' | 'centered'
    >
    & Overlay.Types.WithControls
    & {
        leaderElementOrRectRef: (
            RelativelyPositioned.useRelativePosition.LeaderElementOrRectRef
        );
        label: string;
        animationVariants?: createVariants.BaseVariantsWithKey;
    }
);

export const MenuContext = ContextSelectable.createContext<
    MenuContext
>();