import * as c1 from './hooks';
import * as c2 from './components';
import { Dialog } from '@components';



export namespace Modal {
    export import useModalControls = c1.useModalControls;

    export import Base = c2.BaseModal;

    export import Context = Dialog.Context;
}