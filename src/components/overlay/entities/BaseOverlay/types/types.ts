import type { Overlay } from '@/components';
import { useAnimateTransition } from '@/hooks';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useRefManager } from '@lesnoypudge/utils-react';
import { MotionValue } from 'motion/react';
import { MutableRefObject, PropsWithChildren } from 'react';



export namespace Types {
    export type Context = {
        progress: MotionValue<number> | undefined;
        onEnter: useAnimateTransition.OnEnter | undefined;
        onExit: useAnimateTransition.OnExit | undefined;
        isOverlayExist: boolean;
        isOverlayExistRef: MutableRefObject<boolean>;
        closingThrottleRef: MutableRefObject<boolean>;
        portalRefManager: useRefManager.NullableRefManager<HTMLDivElement>;
        openOverlay: VoidFunction;
        closeOverlay: VoidFunction;
        toggleOverlay: VoidFunction;
        setOverlay: (value: boolean) => void;
    };

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
            & Partial<Pick<Context, 'progress' | 'onEnter' | 'onExit'>>
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