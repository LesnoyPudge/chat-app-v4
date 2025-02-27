import * as c1 from './components';
import * as c2 from './vars';



export namespace BaseDialogBlocks {
    export const { providerProps } = c2;

    export import Content = c1.BaseDialogBlocksContent;

    export import Footer = c1.BaseDialogBlocksFooter;

    export import Header = c1.BaseDialogBlocksHeader;

    export import Subtitle = c1.BaseDialogBlocksSubtitle;

    export import Title = c1.BaseDialogBlocksTitle;

    export import Wrapper = c1.BaseDialogBlocksWrapper;
}