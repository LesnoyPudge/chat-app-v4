import * as components from './components';
import * as context from './context';
import * as types from './types';
import * as hooks from './hooks';



export namespace ChatPageTemplate {
    export import Types = types.Types;

    export const {
        ChatPageTemplateNode: Node,
    } = components;

    export const {
        ChatPageTemplateContext: Context,
    } = context;

    export const {
        useChatPageTemplate,
    } = hooks;
}