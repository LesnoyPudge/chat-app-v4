import * as c1 from './TextInput';
import * as c2 from './components';
import * as c3 from './hooks';


export namespace TextInput {
    export import Node = c1.TextInput;

    export import NodePure = c1.TextInputPure;

    export import Label = c2.Label;

    export import PasswordToggleButton = c2.PasswordToggleButton;

    export import Wrapper = c2.Wrapper;

    export import useTextInputDefaults = c3.useTextInputDefaults;
}