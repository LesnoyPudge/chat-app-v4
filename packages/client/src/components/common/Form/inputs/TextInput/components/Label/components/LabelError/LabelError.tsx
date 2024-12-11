import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useContextSelector } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@utils';
import { FC } from 'react';
import { TextInputContext } from '../../../../context';



const styles = createStyles({
    error: 'w-full text-xs normal-case text-color-error',
});

export namespace LabelError {
    export type Props = RT.PropsWithClassName;
}

export const LabelError: FC<LabelError.Props> = ({
    className = '',
}) => {
    const field = useContextSelector(TextInputContext, (v) => v.field);

    const error = field.state.meta.errors[0];

    return (
        <If condition={!!error}>
            <span className={cn(styles.error, className)}>
                <> &#8722; </>

                {error}
            </span>
        </If>
    );
};