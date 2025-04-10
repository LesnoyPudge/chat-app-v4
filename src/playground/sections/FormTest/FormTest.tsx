import { Button, Form, Inputs } from '@/components';
import { Store, t } from '@/features';
import { TanStackForm, Valibot } from '@/libs';
import { cn, createStyles } from '@/utils';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { HTTP_STATUS_CODES } from '@lesnoypudge/utils';
import { ContextSelectable, createWithDecorator, useFunction, useIsMounted } from '@lesnoypudge/utils-react';
import { Endpoints } from 'fakeShared/endpoints';
import { ApiValidators } from 'fakeShared/validators';
import { ChangeEvent, FC, FormEvent, PropsWithChildren, ReactNode, useState } from 'react';



// const defaultErrorTable = {
//     BAD_REQUEST: t('ApiError.BAD_REQUEST'),
//     FORBIDDEN: t('ApiError.FORBIDDEN'),
//     INTERNAL_SERVER_ERROR: t('ApiError.INTERNAL_SERVER_ERROR'),
//     NOT_FOUND: t('ApiError.NOT_FOUND'),
//     UNAUTHORIZED: t('ApiError.UNAUTHORIZED'),
// } satisfies Form.Types.ErrorTable;

// const codeToName = {
//     [HTTP_STATUS_CODES.BAD_REQUEST]: 'BAD_REQUEST',
//     [HTTP_STATUS_CODES.FORBIDDEN]: 'FORBIDDEN',
//     [HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR]: 'INTERNAL_SERVER_ERROR',
//     [HTTP_STATUS_CODES.NOT_FOUND]: 'NOT_FOUND',
//     [HTTP_STATUS_CODES.UNAUTHORIZED]: 'UNAUTHORIZED',
// } satisfies Record<
//     T.ValueOf<Form.Types.StatusCode>,
//     Form.Types.ErrorCodes
// >;

// namespace Form {
//     export namespace Types {
//         export type StatusCode = T.Except<typeof HTTP_STATUS_CODES, 'OK'>;

//         export type ErrorCodes = keyof StatusCode;

//         export type ErrorTable = Record<
//             ErrorCodes,
//             ReturnType<t>
//         >;

//         export type ValidationError = TanStackForm.StandardSchemaV1Issue;

//         type SubmitResolve<
//             _SubmitResult,
//         > = (data: _SubmitResult) => void;

//         type FormOptionsWrapper<
//             _Shape extends T.UnknownRecord,
//             _SubmitResult = any,
//         > = (
//             T.Except<
//                 TanStackForm.FormOptions<
//                     _Shape,
//                     any,
//                     any,
//                     any,
//                     any,
//                     any,
//                     any,
//                     any,
//                     any,
//                     any
//                 >,
//                 'onSubmit'
//             >
//             & {
//                 onSubmitSuccess?: SubmitResolve<_SubmitResult>;
//                 onSubmitSuccessMounted?: SubmitResolve<_SubmitResult>;
//                 errorTable?: Partial<ErrorTable>;
//                 validator?: Valibot.GenericSchema<_Shape>;
//             }
//         );

//         type FormApiWrapper<_Shape extends T.UnknownRecord> = (
//             TanStackForm.ReactFormExtendedApi<
//                 _Shape,
//                 any,
//                 any,
//                 any,
//                 any,
//                 any,
//                 any,
//                 any,
//                 any,
//                 any
//             >
//         );

//         type FieldApiWrapper<_Value> = TanStackForm.FieldApi<
//             any,
//             string,
//             _Value,
//             any,
//             any,
//             any,
//             any,
//             any,
//             any,
//             any,
//             any,
//             any,
//             any,
//             any,
//             any,
//             any,
//             any,
//             any,
//             any
//         >;

//         export type GenericNameWrapper<
//             _Shape extends T.UnknownRecord = T.UnknownRecord,
//         > = Record<'_', TanStackForm.DeepKeys<_Shape>>;

//         export type FormContext<
//             _Shape extends T.UnknownRecord = T.UnknownRecord,
//         > = {
//             name: string;
//             submitError: string | null;
//             api: FormApiWrapper<_Shape>;
//         };

//         export type FieldContext<_Value = unknown> = {
//             id: string;
//             isRequired: boolean;
//             field: FieldApiWrapper<_Value>;
//         };

//         export type UseFormContext<
//             _Shape extends T.UnknownRecord = T.UnknownRecord,
//         > = () => FormContext<_Shape>;

//         export type UseFieldContext<
//             _Value = unknown,
//         > = () => FieldContext<_Value>;

//         export namespace FormProvider {
//             export type Props<
//                 _Shape extends T.UnknownRecord,
//             > = (
//                 PropsWithChildren
//                 & {
//                     form: FormContext<_Shape>;
//                 }
//             );

//             export type Fn = <
//                 _Shape extends T.UnknownRecord = T.UnknownRecord,
//             >(props: Props<_Shape>) => ReactNode;

//             export type PreparedFn<
//                 _Shape extends T.UnknownRecord = T.UnknownRecord,
//             > = (props: Props<_Shape>) => ReactNode;
//         }

//         export namespace FieldProvider {
//             export type Props<_Value> = (
//                 PropsWithChildren
//                 & Pick<FieldContext<_Value>, 'field'>
//                 & {
//                     required?: boolean;
//                 }
//             );

//             export type Fn = <
//                 _Value,
//             >(props: Props<_Value>) => ReactNode;

//             export type PreparedFn<
//                 _Value,
//             > = (props: Props<_Value>) => ReactNode;
//         }

//         export namespace GenericFieldProvider {
//             export type Props = (
//                 PropsWithChildren
//                 & {
//                     name: GenericNameWrapper;
//                     required?: boolean;
//                 }
//             );

//             export type Fn = (props: Props) => ReactNode;
//         }

//         export namespace createForm {
//             type Fields<_Shape extends T.AnyRecord> = {
//                 [_Key in keyof _Shape]: {
//                     _: _Key;
//                 }
//             };

//             type UseForm<
//                 _Shape extends T.UnknownRecord,
//             > = () => FormContext<_Shape>;

//             type UseField<
//                 _Shape extends T.UnknownRecord,
//             > = <
//                 _Name extends GenericNameWrapper<_Shape>,
//             >(name: _Name) => FieldContext<_Shape[_Name['_']]>;

//             type FormProvider<
//                 _Shape extends T.UnknownRecord,
//             > = (
//                 props: Types.FormProvider.Props<_Shape>
//             ) => ReactNode;

//             type FieldProvider<
//                 _Value,
//             > = (props: Types.FieldProvider.Props<_Value>) => ReactNode;

//             export type Result<
//                 _Shape extends T.AnyRecord,
//                 _Name extends string,
//             > = {
//                 name: `${_Name}Form`;
//                 options: FormOptionsWrapper<_Shape>;
//                 useForm: UseForm<_Shape>;
//                 useField: UseField<_Shape>;
//                 names: Fields<_Shape>;
//                 Provider: FormProvider<_Shape>;
//                 FieldProvider: FieldProvider<_Shape>;
//             };

//             export type Return<
//                 _Shape extends T.AnyRecord,
//                 _Name extends string,
//             > = {
//                 [x in `${_Name}Form`]: Result<_Shape, _Name>;
//             };

//             export type Fn = <
//                 _Shape extends T.AnyRecord,
//             >(
//                 options: (
//                     { defaultValues: _Shape }
//                     & T.Except<FormOptionsWrapper<_Shape>, 'defaultValues'>
//                 )
//             ) => {
//                 withName: <
//                     _Name extends string,
//                 >(name: _Name) => Return<_Shape, _Name>;
//             };
//         }

//         export namespace UseExtendForm {
//             type ExtraOptions<
//                 _SubmitResult,
//                 _Shape extends T.UnknownRecord,
//             > = {
//                 trigger: (data: _Shape) => (
//                     Promise<(
//                         {
//                             data: _SubmitResult;
//                             error?: undefined;
//                         }
//                         | {
//                             data?: undefined;
//                             error: Store.Types.QueryError;
//                         }
//                     )>
//                 );
//             };

//             export type Fn = <
//                 _Shape extends T.UnknownRecord,
//                 _SubmitResult,
//             >(
//                 form: createForm.Result<_Shape, string>,
//                 options: (
//                     FormOptionsWrapper<_Shape>
//                     & ExtraOptions<_SubmitResult, _Shape>
//                 )
//             ) => {
//                 form: Types.FormContext<_Shape>;
//             };
//         }
//     }

//     const FormContext = ContextSelectable.createContext<Types.FormContext>();

//     const FieldContext = ContextSelectable.createContext<Types.FieldContext>();

//     export const useExtendForm: Types.UseExtendForm.Fn = (
//         createdForm,
//         options,
//     ) => {
//         const { getIsMounted } = useIsMounted();
//         const [
//             submitError,
//             setSubmitError,
//         ] = useState<Types.FormContext['submitError']>(null);

//         type Validators = NonNullable<typeof options.validators>;

//         const validators = {
//             onSubmit: options.validator ?? createdForm.options.validator,
//             onChange: options.validator ?? createdForm.options.validator,
//             ...createdForm.options.validators,
//             ...options.validators,
//         } satisfies Validators;

//         const api = TanStackForm.useForm({
//             ...createdForm.options,
//             ...options,
//             validators,
//             onSubmit: async ({ value }) => {
//                 setSubmitError(null);

//                 const response = await options.trigger(value);
//                 const mergedErrorTable = Object.assign(
//                     defaultErrorTable,
//                     options?.errorTable,
//                 );

//                 if (
//                     response.error
//                     && 'status' in response.error
//                     && typeof response.error.status === 'number'
//                 ) {
//                     const errorName = codeToName[response.error.status];
//                     const errorMessage = mergedErrorTable[errorName];

//                     setSubmitError(errorMessage.toString());
//                     return;
//                 }

//                 if (response.error) {
//                     setSubmitError(
//                         mergedErrorTable.INTERNAL_SERVER_ERROR.toString(),
//                     );
//                     return;
//                 }

//                 options?.onSubmitSuccess?.(response.data);

//                 if (!getIsMounted()) return;

//                 options?.onSubmitSuccessMounted?.(response.data);
//             },
//         });

//         return {
//             form: {
//                 name: createdForm.name,
//                 submitError,
//                 api,
//             },
//         };
//     };

//     export const useStore = TanStackForm.useStore;

//     export const useFormContext = () => {
//         return ContextSelectable.useProxy(FormContext);
//     };

//     export const useFieldContext = <_Value = unknown>() => {
//         return ContextSelectable.useProxy(FieldContext) as (
//             Types.FieldContext<_Value>
//         );
//     };

//     const FormProvider: Types.FormProvider.Fn = ({
//         form,
//         children,
//     }) => {
//         const value = form as Types.FormContext;

//         return (
//             <FormContext.Provider value={value}>
//                 {children}
//             </FormContext.Provider>
//         );
//     };

//     const FieldProvider: Types.FieldProvider.Fn = ({
//         field,
//         required = false,
//         children,
//     }) => {
//         const { name } = useFormContext();
//         // const _field = Form.useStore(field.store);
//         const _field = field as Types.FieldContext['field'];

//         const value: Types.FieldContext = {
//             id: `${name}-${field.name}`,
//             isRequired: required,
//             field: _field,
//         };

//         return (
//             <FieldContext.Provider value={value}>
//                 {children}
//             </FieldContext.Provider>
//         );
//     };

//     export const GenericFieldProvider: Types.GenericFieldProvider.Fn = ({
//         name,
//         required,
//         children,
//     }) => {
//         const { api } = Form.useFormContext();

//         return (
//             <api.Field name={name._}>
//                 {(field) => (
//                     <FieldProvider field={field} required={required}>
//                         {children}
//                     </FieldProvider>
//                 )}
//             </api.Field>
//         );
//     };

//     export const createForm: Types.createForm.Fn = (
//         options,
//     ) => {
//         const result = {
//             withName: <_Name extends string>(name: _Name) => {
//                 const formName = `${name}Form` as const;
//                 const values = options.defaultValues;


//                 type Result = Types.createForm.Result<
//                    typeof values,
//                     _Name
//                 >;

//                 const names = (
//                     Object.keys<Result['names']>(values)
//                         .reduce<Result['names']>((acc, cur) => {
//                             acc[cur] = { _: cur };

//                             return acc;
//                         }, {})
//                 );

//                 const useField = <
//                     _FieldName extends Types.GenericNameWrapper<typeof values>,
//                 >() => {
//                     return useFieldContext() as unknown as Types.FieldContext<
//                         (typeof values)[_FieldName['_']]
//                     >;
//                 };

//                 const useForm = () => {
//                     return useFormContext() as Types.FormContext<
//                         typeof values
//                     >;
//                 };

//                 const result: Result = {
//                     name: formName,
//                     options: TanStackForm.formOptions(options),
//                     names,
//                     Provider: FormProvider,
//                     FieldProvider,
//                     useField,
//                     useForm,
//                 };

//                 type Return = Types.createForm.Return<
//                     typeof values,
//                     _Name
//                 >;

//                 const resultWithFormName = {
//                     [formName]: result,
//                 } as Return;

//                 return resultWithFormName;
//             },
//         };

//         return result;
//     };

//     export const Node = ({ children }: PropsWithChildren) => {
//         const { api, name } = Form.useFormContext();

//         const handleSubmit = useFunction((e: FormEvent) => {
//             e.preventDefault();
//             e.stopPropagation();
//             void api.handleSubmit();
//         });

//         return (
//             <form
//                 className='flex flex-col gap-4'
//                 data-form-name={name}
//                 onSubmit={handleSubmit}
//             >
//                 {children}
//             </form>
//         );
//     };

//     export namespace Blocks {
//         export const FormError: FC<RT.PropsWithChildrenAndClassName> = ({
//             className = '',
//         }) => {
//             const { submitError } = Form.useFormContext();

//             const styles = createStyles({
//                 wrapper: 'rounded-md bg-danger p-2 font-semibold text-white',
//             });

//             if (!submitError) return null;

//             return (
//                 <div
//                     className={cn(styles.wrapper, className)}
//                     aria-live='polite'
//                 >
//                     {submitError}
//                 </div>
//             );
//         };

//         export const Label: FC<RT.PropsWithChildrenAndClassName> = ({
//             className = '',
//             children,
//         }) => {
//             const { id, field, isRequired } = Form.useFieldContext();
//             const error = Form.useStore(
//                 field.store,
//                 (v) => v.meta.errors[0] as Types.ValidationError,
//             );

//             const isTouched = Form.useStore(
//                 field.store, (v) => v.meta.isTouched,
//             );

//             const isPristine = Form.useStore(
//                 field.store, (v) => v.meta.isPristine,
//             );

//             const isBlurred = Form.useStore(
//                 field.store, (v) => v.meta.isBlurred,
//             );

//             const shouldShowWildcard = isRequired;
//             const shouldShowError = (
//                 !!error
//                 && (
//                     !isPristine
//                     || (isTouched && isBlurred)
//                 )
//             );

//             const styles = createStyles({
//                 label: `
//                     mb-2
//                     block
//                     text-xs
//                     font-bold
//                     uppercase
//                     text-color-secondary
//                 `,
//                 wildcard: 'leading-none text-color-error',
//                 error: `
//                     w-full
//                     truncate
//                     text-xs
//                     normal-case
//                     text-color-error
//                 `,
//             });

//             return (
//                 <label
//                     className={cn(styles.label, className)}
//                     htmlFor={id}
//                 >
//                     {children}

//                     <If condition={shouldShowWildcard}>
//                         <span className={styles.wildcard}>
//                             <>*</>
//                         </span>
//                     </If>

//                     <If condition={shouldShowError}>
//                         <span className={styles.error}>
//                             {/* long minus symbol */}
//                             <> &#8722; </>

//                             {error.message}
//                         </span>
//                     </If>
//                 </label>
//             );
//         };
//     }

//     export namespace Inputs {
//         export namespace TextInput {
//             type Context = {
//                 id: string;
//                 label: string;
//                 value: string;
//                 name: string;
//                 onChange: (value: string) => void;
//                 onChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
//                 onBlur: VoidFunction;
//             };

//             const Context = ContextSelectable.createContext<Context>();

//             const useTextInputContext = () => {
//                 return ContextSelectable.useProxy(Context);
//             };

//             type ProviderProps = (
//                 PropsWithChildren
//                 & Pick<Context, 'label'>
//             );

//             type DecoratorProps = T.Except<
//                 Types.GenericFieldProvider.Props,
//                 'children'
//             >;

//             const {
//                 withDecorator: createFieldProvider,
//             } = createWithDecorator<DecoratorProps>(({
//                 children,
//                 ...rest
//             }) => {
//                 return (
//                     <Form.GenericFieldProvider {...rest}>
//                         {children}
//                     </Form.GenericFieldProvider>
//                 );
//             });

//             export const Provider = createFieldProvider<ProviderProps>(({
//                 label,
//                 children,
//             }) => {
//                 const { field, id } = Form.useFieldContext<string>();
//                 const fieldValue = Form.useStore(field.store, (v) => v.value);

//                 const onChangeEvent: Context['onChangeEvent'] = useFunction((e) => {
//                     field.setValue(e.target.value);
//                 });

//                 const value: Context = {
//                     id,
//                     label,
//                     name: field.name,
//                     onChange: field.handleChange,
//                     onChangeEvent,
//                     onBlur: field.handleBlur,
//                     value: fieldValue,
//                 };

//                 return (
//                     <Context.Provider value={value}>
//                         {children}
//                     </Context.Provider>
//                 );
//             });

//             export const Node = () => {
//                 const {
//                     id,
//                     onChangeEvent,
//                     onBlur,
//                     value,
//                     label,
//                     name,
//                 } = useTextInputContext();

//                 return (
//                     <input
//                         id={id}
//                         name={name}
//                         value={value}
//                         aria-label={label}
//                         onChange={onChangeEvent}
//                         onFocus={() => {
//                             console.log(`ON_FOCUS: ${name}`);
//                         }}
//                         onBlur={() => {
//                             console.log(`ON_BLUR: ${name}`);
//                             onBlur();
//                         }}
//                     />
//                 );
//             };
//         }
//     }
// }


const { LoginForm } = Form.createForm<
    Endpoints.V1.User.Login.RequestBody
>({
    defaultValues: {
        login: '',
        password: '',
    },
}).withName('Login');

export const FormTest = () => {
    const [
        triggerLogin,
        { data, error, originalArgs },
    ] = Store.Users.Api.useUserLoginMutation();

    const { form } = Form.useExtendForm(LoginForm, {
        trigger: triggerLogin,
        onSubmitSuccess: async (data) => {
            // Do something with form data
            console.log(data);
        },
        validator: ApiValidators.UserLogin,
        errorTable: {
            BAD_REQUEST: t('LoginForm.BAD_REQUEST'),
        },
    });

    LoginForm.name;
    //           ^?

    form.api.state.values;
    //              ^?

    return (
        <LoginForm.Provider form={form}>
            <Form.Node>
                <Inputs.TextInput.Provider
                    label=''
                    name={LoginForm.names.login}
                    required
                >
                    <Inputs.TextInput.Node/>

                    <Form.Label>
                        <>login label</>
                    </Form.Label>
                </Inputs.TextInput.Provider>

                <Inputs.TextInput.Provider
                    label=''
                    name={LoginForm.names.password}
                    required
                >
                    <Inputs.TextInput.Node/>

                    <Form.Label>
                        <>password label</>
                    </Form.Label>
                </Inputs.TextInput.Provider>

                <Button type='submit'>
                    <>submit</>
                </Button>

                <Form.Error/>
            </Form.Node>
        </LoginForm.Provider>
    );
};