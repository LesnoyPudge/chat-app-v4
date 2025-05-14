import type { Overlay } from '@/components';
import { useAnimateTransition } from '@/hooks';
import { T } from '@lesnoypudge/types-utils-base';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useRefManager } from '@lesnoypudge/utils-react';
import { MotionValue } from 'motion/react';
import { MutableRefObject, PropsWithChildren } from 'react';



export namespace Types {
    export type Animation = {
        progress: MotionValue<number> | undefined;
        onEnter: useAnimateTransition.OnEnter | undefined;
        onExit: useAnimateTransition.OnExit | undefined;
    };

    export type Context = T.Simplify<(
        Animation
        & {

            isOverlayExist: boolean;
            isOverlayExistRef: MutableRefObject<boolean>;
            closingThrottleRef: MutableRefObject<boolean>;
            portalRefManager: useRefManager.NullableRefManager<HTMLDivElement>;
            openOverlay: VoidFunction;
            closeOverlay: VoidFunction;
            toggleOverlay: VoidFunction;
            setOverlay: (value: boolean) => void;
        }
    )>;

    export type WithControlsOrInitialState = (
        {
            controls: Overlay.Types.Controls;
            initialState?: never;
        }
        | {
            controls?: never;
            initialState: boolean;
        }
    );

    export namespace Provider {
        export type Props = (
            PropsWithChildren
            & WithControlsOrInitialState
            & Partial<Animation>
            & {
                disabled?: boolean;
            }
        );
    }

    export namespace Wrapper {
        export type Props = RT.PropsWithChildrenAndClassName;
    }

    export type PublicProps = Overlay.Types.WithControls;
}