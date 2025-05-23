import * as components from './components';
import * as types from './types';
import * as context from './context';
import * as hooks from './hooks';
import * as presets from './presets';



export namespace MessageEditor {
    export import Types = types.Types;

    export const {
        MessageEditorWrapper: Wrapper,
        MessageEditorAddAttachmentsButton: AddAttachmentsButton,
        MessageEditorAttachments: Attachments,
        MessageEditorControlsWrapper: ControlsWrapper,
        MessageEditorEmojiPickerButton: EmojiPickerButton,
        MessageEditorScroll: Scroll,
        MessageEditorSubmitButton: SubmitButton,
        MessageEditorEditable: Editable,
        MessageEditorProvider: Provider,
        MessageEditorPaddedWrapper: PaddedWrapper,
    } = components;

    export namespace Presets {
        export const {
            MessageEditorDisabled: Disabled,
            MessageEditorPlaceholder: Placeholder,
            MessageEditorSendMessageInput: SendMessageInput,
        } = presets;
    }

    export const {
        MessageEditorContext: Context,
    } = context;

    export const {
        useMessageEditorContext: useContext,
    } = hooks;
}