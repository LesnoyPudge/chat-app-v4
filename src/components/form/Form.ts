import * as components from './components';
import * as hooks from './hooks';
import * as utils from './utils';
import * as types from './types';



export namespace Form {
    export import Types = types.FormTypes;

    export const {
        useExtendForm,
        useFieldContext,
        useFieldError,
        useFormContext,
        useStore,
        useFieldApi,
        useFieldValue,
        useFormStore,
        useField,
    } = hooks;

    export const {
        createFieldProvider,
        createForm,
    } = utils;

    export const {
        FieldProvider,
        FormError: Error,
        FormNode: Node,
        FormProvider: Provider,
        Label,
        SubmitButton,
        ResetButton,
    } = components;
}