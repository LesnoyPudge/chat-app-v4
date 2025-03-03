import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import css from './PlaceholderNode.module.scss';
import { T } from '@lesnoypudge/types-utils-base/namespace';



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

export const PlaceholderNode: FC<PlaceholderNode.Props> = ({
    className = '',
    ...props
}) => {
    return (
        <Skeleton
            className={cn(css.PlaceholderNode, styles.base, className)}
            enableAnimation={false}
            baseColor={undefined}
            {...props}
        />
    );
};