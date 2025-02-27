import * as c1 from './blocks';
import * as c2 from './utils';
import * as c3 from './components';
import * as c4 from './types';
import * as c5 from './context';



export namespace BaseModal {
    export import Provider = c3.BaseModalProvider;

    export import Wrapper = c3.BaseModalWrapper;

    export import Context = c5.BaseModalContext;

    export import Types = c4.Types;

    export namespace Blocks {
        export import Content = c1.BaseModalContent;

        export import Footer = c1.BaseModalFooter;

        export import Header = c1.BaseModalHeader;

        export import Subtitle = c1.BaseModalSubtitle;

        export import Title = c1.BaseModalTitle;
    }

    export const { createDecorator } = c2;
}