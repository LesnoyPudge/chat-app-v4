import * as components from './components';
import * as utils from './utils';


export namespace Message {
    export const {
        MessageNode: Node,
        MessagePlaceholder: Placeholder,
        MessageRedactorProvider: RedactorProvider,
    } = components;

    export const {
        getPlaceholderVariation,
    } = utils;
}