import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useContextProxy } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@utils';
import { FC } from 'react';
import { TextInputContext } from '../../../../context';



const styles = createStyles({
    wildcard: 'leading-none text-color-error',
});

export namespace LabelWildcard {
    export type Props = RT.PropsWithClassName;
}

export const LabelWildcard: FC<LabelWildcard.Props> = ({
    className = '',
}) => {
    const { required } = useContextProxy(TextInputContext);

    return (
        <If condition={required}>
            <span className={cn(styles.wildcard, className)}>
                <>*</>
            </span>
        </If>
    );
};