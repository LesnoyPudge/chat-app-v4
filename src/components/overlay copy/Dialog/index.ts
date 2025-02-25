import * as c1 from './components';
import * as c2 from './context';


export namespace Dialog {
    export import Provider = c1.DialogProvider;

    export import Wrapper = c1.DialogWrapper;

    export import Context = c2.DialogContext;
}