import type { Overlay, RelativelyPositioned } from '@/components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { createVariants } from '@/utils';
import { PropsWithChildren } from 'react';



export namespace Types {
    export type Context = (
        Overlay.Popover.Types.Context
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

    export namespace Provider {
        export type Props = T.Simplify<(
            PropsWithChildren
            & Pick<
                Context,
                'preferredAlignment'
                | 'leaderElementOrRectRef'
                | 'spacing'
                | 'label'
                | 'controls'
                | 'animationVariants'
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

    export namespace useContextMenuControls {
        export type Props = {
            leaderElementRef: (
                RelativelyPositioned.useRelativePosition.LeaderElementRef
            );
        };

        export type Return = Pick<
            Context,
            'leaderElementOrRectRef' | 'controls'
        >;
    }
}