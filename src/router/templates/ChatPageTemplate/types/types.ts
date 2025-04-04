import { LayoutType } from '@/components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { ReactNode } from 'react';



export namespace Types {
    export type Context = T.Simplify<(
        LayoutType.Types.Context
        & {
            shouldShowMainPanel: boolean;
            shouldShowExtraPanel: boolean;
            toggle: VoidFunction;
        }
    )>;

    export namespace Node {
        export type Props = {
            header: ReactNode;
            main: ReactNode;
            extra: ReactNode;
        };
    }
}