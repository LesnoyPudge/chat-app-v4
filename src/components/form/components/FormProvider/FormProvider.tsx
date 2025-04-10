import { FormContext } from '../../context';
import { FormTypes } from '../../types';



export const FormProvider: FormTypes.FormProvider.Fn = ({
    form,
    children,
}) => {
    const value = form as FormTypes.FormContext;

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    );
};