import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC } from 'react';
import { useFormContext } from '../../hooks';
import { cn, createStyles } from '@/utils';



const styles = createStyles({
    wrapper: 'rounded-md bg-danger p-2 font-semibold text-white',
});

export const FormError: FC<RT.PropsWithClassName> = ({
    className = '',
}) => {
    const { submitError } = useFormContext();

    if (!submitError) return null;

    return (
        <div
            className={cn(styles.wrapper, className)}
            aria-live='polite'
        >
            {submitError}
        </div>
    );
};