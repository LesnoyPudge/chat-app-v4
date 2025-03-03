import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import { FieldApi, ValidationError } from '@tanstack/react-form';



const styles = createStyles({
    error: 'w-full text-xs normal-case text-color-error',
});

export namespace LabelError {
    export type ConditionalProps = (
        {
            error: ValidationError;
            field?: never;
        }
        | {
            error?: never;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            field: FieldApi<any, any, any, any>;
        }
    );

    export type Props = (
        RT.PropsWithClassName
        & ConditionalProps
    );
}

export const LabelError: FC<LabelError.Props> = ({
    className = '',
    error,
    field,
}) => {
    const _error = (
        field
            ? field.state.meta.isTouched
                ? field.state.meta.errors[0]
                : null
            : error
    );

    return (
        <If condition={!!_error}>
            <span className={cn(styles.error, className)}>
                <> &#8722; </>

                {_error}
            </span>
        </If>
    );
};