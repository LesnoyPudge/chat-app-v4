import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useFunction } from '@lesnoypudge/utils-react';
import { PropsWithInnerRef } from '@types';
import { ComponentPropsWithoutRef, FC, FormEvent } from 'react';



export namespace FormNode {
    export type OnSubmit = (
        e: FormEvent<HTMLFormElement>
    ) => Promise<void> | void;

    export type OwnProps = (
        RT.PropsWithChildrenAndClassName
        & PropsWithInnerRef<'form'>
        & {
            onSubmit: OnSubmit;
        }
    );

    export type Props = (
        Omit<ComponentPropsWithoutRef<'form'>, keyof OwnProps>
        & OwnProps
    );
}

export const FormNode: FC<FormNode.Props> = ({
    className = '',
    onSubmit,
    children,
    ...rest
}) => {
    const handleSubmit: FormNode.OnSubmit = useFunction((e) => {
        e.preventDefault();
        e.stopPropagation();
        void onSubmit(e);
    });

    return (
        <form
            className={className}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit}
            {...rest}
        >
            {children}
        </form>
    );
};