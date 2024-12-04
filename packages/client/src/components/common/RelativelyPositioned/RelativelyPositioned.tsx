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
        RT.PropsWithRenderFunctionOrNode<[useRelativePosition.WithAlignment]>
        & useRelativePosition.RelativePositionOptions
        & Pick<
            useRelativePosition.Props,
            'leaderElementOrRectRef'
        >
    );
}

export const RelativelyPositioned: FC<RelativelyPositioned.Props> = ({
    leaderElementOrRectRef,
    preferredAlignment,
    swappableAlignment,
    centered,
    spacing = 20,
    boundsSize = 20,
    unbounded,
    children,
}) => {
    const followerElementRef = useRefManager<HTMLDivElement>(null);
    const { alignment } = useRelativePosition({
        preferredAlignment,
        followerElementRef,
        leaderElementOrRectRef,
        swappableAlignment,
        centered,
        spacing,
        boundsSize,
        unbounded,
    });

    return (
        <div className={styles.wrapper} ref={followerElementRef}>
            {renderFunction(children, { alignment })}
        </div>
    );
};