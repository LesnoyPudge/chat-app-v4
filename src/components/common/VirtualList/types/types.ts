import { VirtualRender, KeyboardNavigation } from '@/components';
import { T } from '@lesnoypudge/types-utils-base/namespace';



export namespace Types {
    export import VirtualRenderTypes = VirtualRender.Types;

    export import KeyboardNavigationTypes = KeyboardNavigation.Types;

    export namespace Node {
        type KeyboardNavigationNonIntersectingProps = (
            Exclude<
                keyof KeyboardNavigation.Types.Provider.Props,
                keyof VirtualRender.Types.List.PropsWithList<string>
                | 'list'
            >
        );

        export type Props = T.Simplify<(
            Pick<
                KeyboardNavigation.Types.Provider.Props,
                KeyboardNavigationNonIntersectingProps
            >
            & VirtualRender.Types.List.PropsWithList<string>
        )>;
    }
}