import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';
import { Emoji } from '@components';



declare module 'slate' {
    interface CustomTypes {
        Editor: RTETypes.Editor;
        Element: RTETypes.Element;
        Text: RTETypes.Text;
    }
}

export namespace RTETypes {
    export type Editor = (
        BaseEditor
        & ReactEditor
        & HistoryEditor
    );

    export namespace Elements {
        export type Paragraph = {
            type: 'paragraph';
            children: RTETypes.Nodes;
        };

        export type Link<_Text extends string = string> = {
            type: 'link';
            url: string;
            children: [Text<_Text>];
        };

        import Codes = Emoji.Store.EmojiCodeWithAliases;

        export type Emoji<
            _Code extends Codes = Codes,
        > = {
            type: 'emoji';
            code: _Code;
            children: [Text<_Code>];
        };
    }

    export type Element = (
        Elements.Paragraph |
        Elements.Link |
        Elements.Emoji
    );

    export type Text<_Text extends string = string> = {
        text: _Text;
        bold?: boolean;
        italic?: boolean;
    };

    export namespace Helpers {
        export type WithEditor<_Rest = object> = _Rest & {
            editor: RTETypes.Editor;
        };
    }

    export namespace Plugins {
        export type WithCharacterLimit = {
            maxLength: number;
        };
    }

    export type Node = RTETypes.Element | RTETypes.Text;

    export type Nodes = RTETypes.Node[];
}