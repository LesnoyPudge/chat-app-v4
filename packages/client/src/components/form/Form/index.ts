import * as formLib from '@tanstack/react-form';
import { FormNode } from './components';
import * as utils from './utils';
import { FormInputs } from './inputs';



export namespace Form {
    export import Node = FormNode;

    export import Inputs = FormInputs;

    export import createForm = utils.createForm;

    export import createFormContext = utils.createFormContext;

    export import useForm = formLib.useForm;
}