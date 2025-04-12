/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store, t } from '@/features';
import { TanStackForm, Valibot } from '@/libs';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { HTTP_STATUS_CODES } from '@lesnoypudge/utils';
import { PropsWithChildren, ReactNode } from 'react';



export namespace FormTypes {
    export type StatusCode = T.Except<typeof HTTP_STATUS_CODES, 'OK'>;

    export type ErrorCodes = keyof StatusCode;

    export type ErrorTable = Record<
        ErrorCodes,
        ReturnType<t>
    >;

    export type ValidationError = TanStackForm.StandardSchemaV1Issue;

    type SubmitResolve<
        _SubmitResult,
    > = (data: _SubmitResult) => void;

    type FormOptionsWrapper<
        _Shape extends T.UnknownRecord,
        _SubmitResult = any,
    > = (
        T.Except<
            TanStackForm.FormOptions<
                _Shape,
                any,
                any,
                any,
                any,
                any,
                any,
                any,
                any,
                any
            >,
            'onSubmit'
        >
        & {
            onSubmitSuccess?: SubmitResolve<_SubmitResult>;
            onSubmitSuccessMounted?: SubmitResolve<_SubmitResult>;
            errorTable?: Partial<ErrorTable>;
            validator?: Valibot.GenericSchema<_Shape>;
        }
    );

    type FormApiWrapper<_Shape extends T.UnknownRecord> = (
        TanStackForm.ReactFormExtendedApi<
            _Shape,
            any,
            any,
            any,
            any,
            any,
            any,
            any,
            any,
            any
        >
    );

    type FieldApiWrapper<_Value> = TanStackForm.FieldApi<
        any,
        string,
        _Value,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any
    >;

    export type GenericNameWrapper<
        _Shape extends T.UnknownRecord = T.UnknownRecord,
    > = Record<'_', TanStackForm.DeepKeys<_Shape>>;

    export type FormContext<
        _Shape extends T.UnknownRecord = T.UnknownRecord,
    > = {
        name: string;
        submitError: string | null;
        api: FormApiWrapper<_Shape>;
    };

    export type FieldContext<_Value = unknown> = {
        id: string;
        required: boolean;
        field: FieldApiWrapper<_Value>;
    };

    export type UseFormContext<
        _Shape extends T.UnknownRecord = T.UnknownRecord,
    > = () => FormContext<_Shape>;

    export type UseFieldContext<
        _Value = unknown,
    > = () => FieldContext<_Value>;

    export namespace FormProvider {
        export type Props<
            _Shape extends T.UnknownRecord,
        > = (
            PropsWithChildren
            & {
                form: FormContext<_Shape>;
            }
        );

        export type Fn = <
            _Shape extends T.UnknownRecord = T.UnknownRecord,
        >(props: Props<_Shape>) => ReactNode;

        export type PreparedFn<
            _Shape extends T.UnknownRecord = T.UnknownRecord,
        > = (props: Props<_Shape>) => ReactNode;
    }

    export namespace FieldProvider {
        export type Props<_Value> = (
            PropsWithChildren
            & {
                required: boolean;
                name: GenericNameWrapper;
            }
        );

        export type Fn = <
            _Value,
        >(props: Props<_Value>) => ReactNode;

        export type PreparedFn<
            _Value,
        > = (props: Props<_Value>) => ReactNode;
    }

    export namespace createForm {
        type Fields<_Shape extends T.AnyRecord> = {
            [_Key in keyof _Shape]: {
                _: _Key;
            }
        };

        type UseForm<
            _Shape extends T.UnknownRecord,
        > = () => FormContext<_Shape>;

        type UseField<
            _Shape extends T.UnknownRecord,
        > = <
            _Name extends GenericNameWrapper<_Shape>,
        >(name: _Name) => FieldContext<_Shape[_Name['_']]>;

        type TypedFormProvider<
            _Shape extends T.UnknownRecord,
        > = (
            props: FormProvider.Props<_Shape>
        ) => ReactNode;

        type TypedFieldProvider<
            _Value,
        > = (props: FieldProvider.Props<_Value>) => ReactNode;

        export type Result<
            _Shape extends T.AnyRecord,
            _Name extends string,
        > = {
            name: `${_Name}Form`;
            options: FormOptionsWrapper<_Shape>;
            useForm: UseForm<_Shape>;
            useField: UseField<_Shape>;
            names: Fields<_Shape>;
            Provider: TypedFormProvider<_Shape>;
            FieldProvider: TypedFieldProvider<_Shape>;
        };

        export type Return<
            _Shape extends T.AnyRecord,
            _Name extends string,
        > = {
            [x in `${_Name}Form`]: Result<_Shape, _Name>;
        };

        export type Fn = <
            _Shape extends T.AnyRecord,
        >(
            options: (
                { defaultValues: _Shape }
                & T.Except<FormOptionsWrapper<_Shape>, 'defaultValues'>
            )
        ) => {
            withName: <
                _Name extends string,
            >(name: _Name) => Return<_Shape, _Name>;
        };
    }

    export namespace useExtendForm {
        type ExtraOptions<
            _SubmitResult,
            _Shape extends T.UnknownRecord,
        > = {
            trigger: (data: _Shape) => (
                Promise<(
                    {
                        data: _SubmitResult;
                        error?: undefined;
                    }
                    | {
                        data?: undefined;
                        error: Store.Types.QueryError;
                    }
                )>
            );
        };

        export type Fn = <
            _Shape extends T.UnknownRecord,
            _SubmitResult,
        >(
            form: createForm.Result<_Shape, string>,
            options: (
                FormOptionsWrapper<_Shape, _SubmitResult>
                & ExtraOptions<_SubmitResult, _Shape>
            )
        ) => {
            form: FormContext<_Shape>;
        };
    }

    export namespace createFieldProvider {
        export type DecoratorProps = T.Simplify<
            Pick<
                FieldProvider.Props<unknown>,
                'name'
            >
            & Pick<
                Partial<FieldProvider.Props<unknown>>,
                'required'
            >
        >;
    }

    export type SetValue<_Value> = FieldApiWrapper<_Value>['setValue'];
}