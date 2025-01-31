import { cn, createStyles } from '@utils';
import { FC } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import './PlaceholderNode.scss';
import { T } from '@lesnoypudge/types-utils-base/namespace';



const css = 'PlaceholderNode';

const styles = createStyles({
    base: 'animate-pulse bg-primary-100',
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

export const PlaceholderNode: FC<PlaceholderNode.Props> = ({
    className = '',
    ...props
}) => {
    return (
        <Skeleton
            className={cn(css, styles.base, className)}
            enableAnimation={false}
            baseColor={undefined}
            {...props}
        />
    );
};