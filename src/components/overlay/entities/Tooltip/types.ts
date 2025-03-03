import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { RelativelyPositioned } from '@/components';
import { T } from '@lesnoypudge/types-utils-base/namespace';



export namespace Types {
    export namespace Node {
        export type Props = T.Simplify<(
            RT.PropsWithChildrenAndClassName
            & RelativelyPositioned.useRelativePosition.Options
            & {
                leaderElementRef: (
                    RelativelyPositioned.useRelativePosition.LeaderElementRef
                );
                within?: boolean;
            }
        )>;
    }

    export namespace useTooltip {
        export type Props = Required<Pick<
            Node.Props,
            'leaderElementRef' | 'within'
        >>;
    }
}