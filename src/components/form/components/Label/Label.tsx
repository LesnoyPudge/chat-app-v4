import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC } from 'react';
import { useFieldContext, useFieldError, useStore } from '../../hooks';
import { cn, createStyles } from '@/utils';



const styles = createStyles({
    label: `
        mb-2 
        block 
        text-xs 
        font-bold 
        uppercase 
        text-color-secondary
    `,
    wildcard: 'leading-none text-color-error',
    error: `
        w-full 
        truncate 
        text-xs 
        normal-case
        text-color-error
    `,
});

export const Label: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    const { id, field, required } = useFieldContext();
    const error = useFieldError(field);

    const isTouched = useStore(
        field.store, (v) => v.meta.isTouched,
    );

    const isPristine = useStore(
        field.store, (v) => v.meta.isPristine,
    );

    const isBlurred = useStore(
        field.store, (v) => v.meta.isBlurred,
    );

    const shouldShowWildcard = required;
    const shouldShowError = (
        !!error
        && (
            !isPristine
            || (isTouched && isBlurred)
        )
    );

    return (
        <label
            className={cn(styles.label, className)}
            htmlFor={id}
        >
            {children}

            <If condition={shouldShowWildcard}>
                <span className={styles.wildcard}>
                    <>*</>
                </span>
            </If>

            <If condition={shouldShowError}>
                <span className={styles.error}>
                    {/* long minus symbol */}
                    <> &#8722; </>

                    {error}
                </span>
            </If>
        </label>
    );
};