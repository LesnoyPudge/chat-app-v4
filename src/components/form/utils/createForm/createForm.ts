import { TanStackForm } from '@/libs';
import * as hooks from '../../hooks';
import { FormTypes } from '../../types';
import { FieldProvider, FormProvider } from '../../components';



export const createForm: FormTypes.createForm.Fn = (
    options,
) => {
    const result = {
        withName: <_Name extends string>(name: _Name) => {
            const formName = `${name}Form` as const;
            const values = options.defaultValues;

            type Shape = typeof values;

            type Result = FormTypes.createForm.Result<
                Shape,
                _Name
            >;

            const names = (
                Object.keys<Result['names']>(values)
                    .reduce<Result['names']>((acc, cur) => {
                        acc[cur] = { _: cur };

                        return acc;
                    }, {})
            );

            const useFieldContext: Result['useFieldContext'] = () => {
                return hooks.useFieldContext();
            };

            const useFormContext: Result['useFormContext'] = () => {
                return hooks.useFormContext();
            };

            const useFieldApi: Result['useFieldApi'] = (name) => {
                return hooks.useFieldApi(name);
            };

            const useFieldError: Result['useFieldError'] = (name) => {
                const api = hooks.useFieldApi(name);
                return hooks.useFieldError(api);
            };

            const useFieldValue: Result['useFieldValue'] = (name) => {
                const api = hooks.useFieldApi(name);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return hooks.useFieldValue(api) as Shape[(typeof name)['_']];
            };

            const result: Result = {
                name: formName,
                options: TanStackForm.formOptions(options),
                names,
                Provider: FormProvider,
                FieldProvider,
                useFieldContext,
                useFormContext,
                useFieldApi,
                useFieldError,
                useFieldValue,
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