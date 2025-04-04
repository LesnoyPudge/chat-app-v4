import { cn, createStyles } from '@/utils';
import { FC, memo } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import './PlaceholderNode.scss';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { decorate } from '@lesnoypudge/macro';
import { withDisplayName } from '@lesnoypudge/utils-react';



const styles = createStyles({
    base: 'animate-placeholder',
});

export namespace PlaceholderNode {
    export type Props = T.Except<
        SkeletonProps,
        'baseColor'
        | 'enableAnimation'
        | 'highlightColor'
        | 'customHighlightBackground'
    >;
}

decorate(withDisplayName, 'PlaceholderNode', decorate.target);
decorate(memo, decorate.target);

export const PlaceholderNode: FC<PlaceholderNode.Props> = ({
    className = '',
    ...props
}) => {
    return (
        <Skeleton
            className={cn('PlaceholderNode', styles.base, className)}
            enableAnimation={true}
            baseColor={undefined}
            {...props}
        />
    );
};