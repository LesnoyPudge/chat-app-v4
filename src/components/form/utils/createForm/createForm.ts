import { TanStackForm } from '@/libs';
import { useFieldContext, useFormContext } from '../../hooks';
import { FormTypes } from '../../types';
import { FieldProvider, FormProvider } from '../../components';



export const createForm: FormTypes.createForm.Fn = (
    options,
) => {
    const result = {
        withName: <_Name extends string>(name: _Name) => {
            const formName = `${name}Form` as const;
            const values = options.defaultValues;


            type Result = FormTypes.createForm.Result<
               typeof values,
                _Name
            >;

            const names = (
                Object.keys<Result['names']>(values)
                    .reduce<Result['names']>((acc, cur) => {
                        acc[cur] = { _: cur };

                        return acc;
                    }, {})
            );

            const useField = <
                _FieldName extends FormTypes.GenericNameWrapper<typeof values>,
            >() => {
                return useFieldContext() as FormTypes.FieldContext<
                    (typeof values)[_FieldName['_']]
                >;
            };

            const useForm = () => {
                return useFormContext() as FormTypes.FormContext<
                    typeof values
                >;
            };

            const result: Result = {
                name: formName,
                options: TanStackForm.formOptions(options),
                names,
                Provider: FormProvider,
                FieldProvider,
                useField,
                useForm,
            };

            type Return = FormTypes.createForm.Return<
                typeof values,
                _Name
            >;

            const resultWithFormName = {
                [formName]: result,
            } as Return;

            return resultWithFormName;
        },
    };

    return result;
};