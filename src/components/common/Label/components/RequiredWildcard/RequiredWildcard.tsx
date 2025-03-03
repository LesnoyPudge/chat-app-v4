import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@/utils';
import { FC } from 'react';



const styles = createStyles({
    wildcard: 'leading-none text-color-error',
});

export namespace LabelWildcard {
    export type Props = RT.PropsWithClassName;
}

export const LabelWildcard: FC<LabelWildcard.Props> = ({
    className = '',
}) => {
    return (
        <span className={cn(styles.wildcard, className)}>
            <>*</>
        </span>
    );
};