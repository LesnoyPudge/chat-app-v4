import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useFunction } from '@lesnoypudge/utils-react';
import { ComponentProps, FC } from 'react';



export namespace Form {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & Required<Pick<
            ComponentProps<'form'>,
            'onSubmit'
        >>
    );
}

export const Form: FC<Form.Props> = ({
    className = '',
    onSubmit,
    children,
}) => {
    const handleSubmit: typeof onSubmit = useFunction((e) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit(e);
    });

    return (
        <form
            className={className}
            onSubmit={handleSubmit}
        >
            {children}
        </form>
    );
};