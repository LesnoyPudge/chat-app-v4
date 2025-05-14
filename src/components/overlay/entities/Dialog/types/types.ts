import type { Overlay } from '@/components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { PropsWithChildren } from 'react';
import { AnimationPresets } from '@/entities';



export namespace Types {
    type WithProgress = T.SetNonNullable<Pick<
        Overlay.Popover.Types.Context, 'progress'
    >>;

    type WithDialogAnimations = T.Simplify<T.RequireAllOrNone<(
        WithProgress
        & {
            dialogStyle: AnimationPresets.Types.Style;
            onEnter: AnimationPresets.Types.OnEnter;
            onExit: AnimationPresets.Types.OnExit;
        }
    )>>;

    type WithBackdropAnimations = T.Simplify<T.RequireAllOrNone<{
        backdropStyle: AnimationPresets.Types.Style;
    }>>;

    export type Context = T.Simplify<(
        T.Except<
            Overlay.Popover.Types.Context,
            'onEnter' | 'onExit' | 'progress'
        >
        & WithDialogAnimations
        & WithBackdropAnimations
        & {
            label: string;
            withBackdrop: boolean;
            withoutPointerEvents: boolean;
        }
    )>;

    export namespace Provider {
        export type OwnProps = T.Simplify<(
            Pick<Context, 'label'>
            & Partial<Pick<
                Context,
                | 'withBackdrop'
                | 'withoutPointerEvents'
            >>
            & WithDialogAnimations
            & WithBackdropAnimations
        )>;

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