import { renderFunction, useRefManager } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { useRelativePosition } from '../../hooks';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { styles } from '../../styles';



export namespace RelativelyPositionedNode {
    export type RequiredProps = (
        Pick<
            useRelativePosition.Props,
            'leaderElementOrRectRef'
        >
        & Pick<
            useRelativePosition.Options,
            'preferredAlignment'
        >
    );

    export type Props = (
        RT.PropsWithRenderFunctionOrNode<[useRelativePosition.Return]>
        & T.Except<useRelativePosition.Options, 'preferredAlignment'>
        & RequiredProps
    );
}

export const RelativelyPositionedNode: FC<
    RelativelyPositionedNode.Props
> = ({
    children,
    ...options
}) => {
    const followerElementRef = useRefManager<HTMLDivElement>(null);
    const withAlignment = useRelativePosition({
        ...options,
        followerElementRef,
    });

    return (
        <div className={styles.wrapper} ref={followerElementRef}>
            {renderFunction(children, withAlignment)}
        </div>
    );
};