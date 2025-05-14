import type { Overlay, RelativelyPositioned } from '@/components';
import { AnimationPresets } from '@/entities';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { PropsWithChildren } from 'react';



export namespace Types {
    type AnimationKeys = 'progress' | 'onEnter' | 'onExit';

    export type Context = T.Simplify<(
        T.Except<Overlay.Popover.Types.Context, AnimationKeys>
        & Pick<
            T.SetNonNullable<Overlay.Popover.Types.Context>,
            AnimationKeys
        >
        & AnimationPresets.Types.WithStyle
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
        }
    )>;

    export namespace Provider {
        export type Props = T.Simplify<(
            PropsWithChildren
            & T.RequireAllOrNone<Pick<Context, 'style' | AnimationKeys>>
            & Pick<
                Context,
                'preferredAlignment'
                | 'leaderElementOrRectRef'
                | 'spacing'
                | 'label'
                | 'controls'
                | 'centered'
            >
        )>;
    }

    export namespace Wrapper {
        export type Props = RT.PropsWithChildrenAndClassName;
    }

    export type PublicProps = (
        Overlay.Types.WithControls
        & Pick<Context, 'leaderElementOrRectRef'>
    );

    type WithLeaderElementRef = {
        leaderElementRef: (
            RelativelyPositioned.useRelativePosition.LeaderElementRef
        );
    };

    export type PublicPropsContextMenu = WithLeaderElementRef;

    export namespace useContextMenuControls {
        export type Props = WithLeaderElementRef;

        export type Return = Pick<
            Context,
            'leaderElementOrRectRef' | 'controls'
        >;
    }
}