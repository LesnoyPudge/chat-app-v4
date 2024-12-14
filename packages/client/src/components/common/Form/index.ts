import * as formLib from '@tanstack/react-form';
import * as c1 from './components';
import * as utils from './utils';
import * as c2 from './inputs';



export namespace Form {
    export import Node = c1.FormNode;

    export import Error = c1.FormError;

    export import Inputs = c2.FormInputs;

    export import createForm = utils.createForm;

    export import createFormContext = utils.createFormContext;

    export import apiAdapter = utils.apiAdapter;

    export import useForm = formLib.useForm;
}