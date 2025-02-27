import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { ContextSelectable, useFunction } from '@lesnoypudge/utils-react';
import { PropsWithInnerRef } from '@types';
import { ComponentPropsWithoutRef, FC, FormEvent } from 'react';
import { UntypedFormContext } from '../../context';
import { invariant } from '@lesnoypudge/utils';



export namespace FormNode {
    export type OnSubmit = (
        e: FormEvent<HTMLFormElement>
    ) => Promise<void> | void;

    export type OwnProps = (
        RT.PropsWithChildrenAndClassName
        & PropsWithInnerRef<'form'>
        & {
            onSubmit?: OnSubmit;
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
    const contextValue = ContextSelectable.useSelector(
        UntypedFormContext,
    ) as UntypedFormContext | undefined;

    const _onSubmit = onSubmit ?? contextValue?.formApi.handleSubmit;
    invariant(_onSubmit);

    const handleSubmit: FormNode.OnSubmit = useFunction((e) => {
        e.preventDefault();
        e.stopPropagation();

        void _onSubmit(e);
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