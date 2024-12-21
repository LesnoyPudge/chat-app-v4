import { FC, PropsWithChildren } from 'react';
import { UntypedFormContext } from '../../context';



export namespace FormProvider {
    export type Props = (
        PropsWithChildren
        & UntypedFormContext
    );
}

export const FormProvider: FC<FormProvider.Props> = ({
    formApi,
    submitError,
    children,
}) => {
    return (
        <UntypedFormContext.Provider value={{
            formApi,
            submitError,
        }}>
            {children}
        </UntypedFormContext.Provider>
    );
};