import type { Overlay } from '@components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { createVariants } from '@utils';
import { PropsWithChildren } from 'react';



export namespace Types {
    export type Context = (
        Overlay.Popover.Types.Context
        & {
            label: string;
            animationVariants: createVariants.BaseVariantsWithKey | undefined;
            backdropAnimationVariants: (
                createVariants.BaseVariantsWithKey | undefined
            );
            withBackdrop: boolean;
        }
    );

    export namespace Provider {
        export type OwnProps = T.Simplify<(
            Pick<Context, 'label'>
            & Partial<Pick<
                Context,
                'animationVariants'
                | 'backdropAnimationVariants'
                | 'withBackdrop'
            >>
        )>;

        export type InnerProps = (
            PropsWithChildren
            & OwnProps
        );

        export type Props = (
            PropsWithChildren
            & Overlay.Types.WithControls
            & OwnProps
        );
    }

    export namespace Wrapper {
        export type Props = RT.PropsWithChildrenAndClassName;
    }

    export type PublicProps = Overlay.Types.WithControls;
}