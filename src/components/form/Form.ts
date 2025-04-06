import * as hooks from './hooks';
import * as components from './components';
import * as utils from './utils';
import * as inputs from './inputs';



export namespace Form {
    export import Node = components.FormNode;

    export import Provider = components.FormProvider;

    export import Error = components.FormError;

    export import Inputs = inputs.FormInputs;

    export const {
        apiAdapter,
        createForm,
        createFormContext,
    } = utils;

    export const {
        useForm,
        useField,
    } = hooks;
}