import { renderFunction, useRefManager } from '@lesnoypudge/utils-react';
import { createStyles } from '@utils';
import { FC } from 'react';
import { useRelativePosition } from './hooks';
import { RT } from '@lesnoypudge/types-utils-react/namespace';



const styles = createStyles({
    wrapper: 'absolute',
});

export namespace RelativelyPositioned {
    export type Props = (
        RT.PropsWithRenderFunctionOrNode<[useRelativePosition.Return]>
        & useRelativePosition.Options
        & Pick<
            useRelativePosition.Props,
            'leaderElementOrRectRef'
        >
    );
}

export const RelativelyPositioned: FC<RelativelyPositioned.Props> = ({
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