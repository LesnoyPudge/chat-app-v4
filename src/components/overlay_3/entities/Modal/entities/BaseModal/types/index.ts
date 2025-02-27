import type { Overlay } from '@components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { PropsWithChildren } from 'react';



export namespace Types {
    export type Context = Overlay.Dialog.Types.Context;

    export namespace Provider {
        export type Props = T.Simplify<(
            & Pick<
                Overlay.Dialog.Types.Provider.Props,
                'label'
                | 'withoutBackdropPointerEvents'
                | 'controls'
            >
            & PropsWithChildren
        )>;
    }

    export namespace Wrapper {
        export type Props = Overlay.Dialog.Types.Wrapper.Props;
    }

    export type PublicProps = Overlay.Dialog.Types.PublicProps;
}