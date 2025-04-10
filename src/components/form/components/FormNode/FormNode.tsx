import { FC, FormEvent } from 'react';
import { useFormContext } from '../../hooks';
import { useFunction } from '@lesnoypudge/utils-react';
import { RT } from '@lesnoypudge/types-utils-react/namespace';



export const FormNode: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
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
            className={className}
            data-form-name={name}
            action='#'
            onSubmit={handleSubmit}
            onReset={handleReset}
        >
            {children}
        </form>
    );
};