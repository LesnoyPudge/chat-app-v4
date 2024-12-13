
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { isPlainObject } from '@lesnoypudge/utils';
import { ReactFormExtendedApi } from '@tanstack/react-form';
import { cn, createStyles } from '@utils';
import { FC, useMemo } from 'react';



const styles = createStyles({
    wrapper: 'rounded-md bg-danger p-2 font-semibold text-white',
});

export namespace FormError {
    export type Props = (
        RT.PropsWithClassName
        & {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formApi: ReactFormExtendedApi<any, any>;
        }
    );
}

export const FormError: FC<FormError.Props> = ({
    className = '',
    formApi,
}) => {
    const errorMapValue = formApi.state.errorMap.onSubmit;
    const error = useMemo(() => (
        isPlainObject(errorMapValue)
            ? errorMapValue.form
            : errorMapValue
    ), [errorMapValue]);

    return (
        <If condition={!!error}>
            <div
                className={cn(styles.wrapper, className)}
                aria-live='polite'
            >
                {error}
            </div>
        </If>
    );
};