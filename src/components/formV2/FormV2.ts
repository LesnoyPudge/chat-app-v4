/* eslint-disable @typescript-eslint/no-explicit-any */
import { t } from '@/features';
import { TanStackForm, Valibot } from '@/libs';
import { T } from '@lesnoypudge/types-utils-base/namespace';



export namespace FormV2 {
    export namespace InternalTypes {
        export type ValidationError = TanStackForm.StandardSchemaV1Issue;

        type SubmitResolve<
            _SubmitResult,
        > = (data: _SubmitResult) => void;

        export type FormOptionsWrapper<
            _Shape extends T.UnknownRecord,
            _SubmitResult = any,
        > = (
            T.Except<
                TanStackForm.FormOptions<
                    _Shape,
                    any, any, any, any, any, any, any, any, any
                >,
                'onSubmit'
            >
            & {
                onSubmitSuccess?: SubmitResolve<_SubmitResult>;
                onSubmitSuccessMounted?: SubmitResolve<_SubmitResult>;
                validator?: Valibot.GenericSchema<_Shape>;
            }
        );

        export type FormApiWrapper<_Shape extends T.UnknownRecord> = (
            TanStackForm.ReactFormExtendedApi<
                _Shape,
                any, any, any, any, any, any, any, any, any
            >
        );

        export type FieldApiWrapper<_Value> = TanStackForm.FieldApi<
            any,
            string,
            _Value,
            any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any
        >;

        export type FormStateWrapper<
            _Shape extends T.UnknownRecord = T.UnknownRecord,
        > = TanStackForm.FormState<
            _Shape, any, any, any, any, any, any, any, any
        >;
    }

    export namespace Types {
        type FormOptions = {};

        type FormOptionsWithNames = {};

        export type createFormContext = <
            _Shape extends T.AnyRecord,
        >(options: FormOptionsWithNames) => void;
    }

    export const createFormContext: Types.createFormContext = (options) => {};

    export const useCreateForm = () => {};
}