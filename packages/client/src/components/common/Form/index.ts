import * as c1 from './hooks';
import * as c2 from './components';
import * as c3 from './utils';
import * as c4 from './inputs';



export namespace Form {
    export import Node = c2.FormNode;

    export import Provider = c2.FormProvider;

    export import Error = c2.FormError;

    export import Inputs = c4.FormInputs;

    export const {
        apiAdapter,
        createForm,
        createFormContext,
    } = c3;

    export import useForm = c1.useForm;
}