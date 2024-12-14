
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { isPlainObject } from '@lesnoypudge/utils';
import { ReactFormExtendedApi, useStore } from '@tanstack/react-form';
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
    const error = useStore(formApi.store, (state) => state.errorMap.onSubmit);

    const _error = useMemo(() => {
        return (
            isPlainObject(error)
                ? error.form?.toString()
                : error?.toString()
        );
    }, [error]);

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