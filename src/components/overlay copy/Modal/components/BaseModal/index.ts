import * as c1 from './components';
import * as c2 from './utils';


export namespace BaseModal {
    export import Provider = c1.BaseModalProvider;

    export import Wrapper = c1.BaseModalWrapper;

    export import Content = c1.BaseModalContent;

    export import Footer = c1.BaseModalFooter;

    export import Header = c1.BaseModalHeader;

    export import Subtitle = c1.BaseModalSubtitle;

    export import Title = c1.BaseModalTitle;

    export const { createDecorator } = c2;
}