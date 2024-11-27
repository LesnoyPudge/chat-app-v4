import { ComponentProps, FC } from 'react';



export namespace Hidden {
    export type Props = ComponentProps<'div'>;
}

export const Hidden: FC<Hidden.Props> = ({
    children,
    ...rest
}) => {
    return (
        <div
            className='sr-only'
            aria-hidden
            {...rest}
        >
            {children}
        </div>
    );
};