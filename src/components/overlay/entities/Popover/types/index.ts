import type { Overlay } from '@/components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { PropsWithChildren } from 'react';



export namespace Types {
    export type Context = T.Simplify<
        Overlay.BaseOverlay.Types.Context
        & {
            blockingChildren: Set<string>;
            focused: boolean;
            handleClickOutside: VoidFunction;
            handleEscape: VoidFunction;
        }
    >;

    export namespace Provider {
        export type Props = (
            PropsWithChildren
            & {
                focused?: boolean;
                blocking?: boolean;
                blockable?: boolean;
                closeOnEscape?: boolean;
                closeOnClickOutside?: boolean;
            }
        );
    }

    export namespace Wrapper {
        export type Props = (
            RT.PropsWithChildrenAndClassName
            & {
                clickProtectorClassName?: string;
            }
        );
    }
}