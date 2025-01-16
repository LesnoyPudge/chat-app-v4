import * as c1 from './hooks';
import * as c2 from './components';
import * as c3 from './types';
import { Dialog } from '@components';



export namespace Modal {
    export import useModalControls = c1.useModalControls;

    export import Base = c2.BaseModal;

    export import Types = c3;

    export import Context = Dialog.Context;
}