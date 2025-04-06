import * as components from './components';
import * as types from './types';



export namespace MessageEditor {
    export import Types = types.Types;

    export const {
        MessageEditorWrapper: Wrapper,
    } = components;
}

// export const MessageEditor = {
//     Wrapper: MessageEditorWrapper,
//     Scroll: MessageEditorScroll,
//     Placeholder: MessageEditorPlaceholder,
//     Disabled: MessageEditorDisabled,
//     AttachmentUploadProvider: MessageEditorAttachmentUploadProvider,
//     ControlsWrapper: MessageEditorControlsWrapper,
//     AttachmentButton: MessageEditorAttachmentButton,
//     EmojiPickerButton: MessageEditorEmojiPickerButton,
//     SubmitButton: MessageEditorSubmitButton,
//     Attachments: MessageEditorAttachments,
// };