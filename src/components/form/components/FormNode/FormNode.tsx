import { FC, FormEvent } from 'react';
import { useFormContext } from '../../hooks';
import { useFunction } from '@lesnoypudge/utils-react';
import { FormTypes } from '../../types';
import { cn, createStyles } from '@/utils';



const styles = createStyles({
    contents: 'contents',
});

export const FormNode: FC<FormTypes.Node.Props> = ({
    className = '',
    contents = false,
    children,
}) => {
    const { api, name } = useFormContext();

    const handleSubmit = useFunction((e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        void api.handleSubmit();
    });

    const handleReset = useFunction((e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        api.reset();
    });

    return (
        <form
            className={cn(
                contents && styles.contents,
                className,
            )}
            data-form-name={name}
            action='#'
            onSubmit={handleSubmit}
            onReset={handleReset}
        >
            {children}
        </form>
    );
};