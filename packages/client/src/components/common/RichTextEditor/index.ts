import * as c1 from './components';
import * as c2 from './RTETypes';
import * as c3 from './RTEModules';
import * as c4 from './context';



export namespace RichTextEditor {
    export import Provider = c1.RTEContextProvider;

    export import Context = c4.RTEContext;

    export import ContentEditable = c1.RTEContentEditable;

    export import Serialized = c1.RTESerialized;

    export import Types = c2.RTETypes;

    export import Modules = c3.RTEModules;
};