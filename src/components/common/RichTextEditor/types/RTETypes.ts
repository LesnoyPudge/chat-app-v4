import { BaseEditor, BaseSelection } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';
import { EmojiStore } from '@/features';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { KeyboardEvent, PropsWithChildren } from 'react';



declare module 'slate' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
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

        import Codes = EmojiStore.EmojiCodeWithAliases;

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

    export type Context = {
        name: string;
        label: string;
        placeholder: string;
        maxLength: number;
        disabled: boolean;
        onSubmit: (value: RTETypes.Nodes, editor: RTETypes.Editor) => void;
        onKeyDown: (e: KeyboardEvent) => void;
        onBlur: VoidFunction;
    };

    export namespace Provider {
        export type Props = T.Simplify<(
            PropsWithChildren
            & Partial<Context>
            & Pick<Context, 'name' | 'label' | 'placeholder'>
            & {
                value?: RTETypes.Nodes;
                onChange?: (value: RTETypes.Nodes) => void;
                onSelectionChange?: (selection: BaseSelection) => void;
            }
        )>;
    }

    export namespace Serialized {
        export type Props = {
            value: string;
        };
    }
}