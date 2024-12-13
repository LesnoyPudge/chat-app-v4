import * as c1 from './TextInput';
import * as c2 from './components';
import * as c3 from './hooks';
import * as c4 from './TextInputProvider';


export namespace TextInput {
    export import Node = c1.TextInput;

    export import NodePure = c1.TextInputPure;

    export import Provider = c4.TextInputProvider;

    export import PasswordToggleButton = c2.PasswordToggleButton;

    export import Wrapper = c2.Wrapper;

    export import useTextInputDefaults = c3.useTextInputDefaults;
}