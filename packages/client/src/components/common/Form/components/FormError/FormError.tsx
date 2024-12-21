import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useContextSelector } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@utils';
import { FC } from 'react';
import { UntypedFormContext } from '../../context';
import { invariant } from '@lesnoypudge/utils';



const styles = createStyles({
    wrapper: 'rounded-md bg-danger p-2 font-semibold text-white',
});

export namespace FormError {
    export type Props = (
        RT.PropsWithClassName
        & {
            error?: string | null;
        }
    );
}

export const FormError: FC<FormError.Props> = ({
    className = '',
    error,
}) => {
    const contextValue = useContextSelector(
        UntypedFormContext,
    ) as UntypedFormContext | undefined;

    const _error = error ?? contextValue?.submitError;
    invariant(_error !== undefined);

    return (
        <If condition={!!_error}>
            <div
                className={cn(styles.wrapper, className)}
                aria-live='polite'
            >
                {_error}
            </div>
        </If>
    );
};