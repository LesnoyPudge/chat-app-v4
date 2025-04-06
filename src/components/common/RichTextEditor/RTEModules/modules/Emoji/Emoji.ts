import { EmojiStore } from '@/features';
import { useCallback } from 'react';
import { Element, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import { RTETypes } from '../../../types';
import { RTEModules } from '../..';



export const Emoji = {
    createEmoji: <
        _Code extends EmojiStore.EmojiCodeWithAliases,
    >(code: _Code): RTETypes.Elements.Emoji<_Code> => {
        return {
            type: 'emoji',
            code,
            children: [
                RTEModules.Text.createText(code),
            ],
        };
    },

    isEmoji: (node: unknown): node is RTETypes.Elements.Emoji => {
        return Element.isElement(node) && node.type === 'emoji';
    },

    getEmojiMatch: (text: string) => {
        const match = EmojiStore.matchEmoji(text.toLowerCase());
        if (!match) return null;

        const emojiCode = match.match[0] as EmojiStore.EmojiCodeWithAliases;

        const matchStart = text.indexOf(emojiCode);
        const matchEnd = matchStart + emojiCode.length;

        return {
            emojiCode,
            matchStart,
            matchEnd,
        };
    },

    withEmoji: ({ editor }: RTETypes.Helpers.WithEditor) => {
        const {
            isInline, isElementReadOnly, isSelectable,
            isVoid, normalizeNode,
        } = editor;

        editor.isInline = (element) => {
            return Emoji.isEmoji(element) || isInline(element);
        };

        editor.isElementReadOnly = (element) => {
            return Emoji.isEmoji(element) || isElementReadOnly(element);
        };

        editor.isSelectable = (element) => {
            return Emoji.isEmoji(element) ? false : isSelectable(element);
        };

        editor.isVoid = (element) => {
            return Emoji.isEmoji(element) || isVoid(element);
        };

        editor.normalizeNode = (...args) => {
            const [entry] = args;

            if (!RTEModules.Text.isSimpleText(editor, entry)) {
                return normalizeNode(...args);
            }

            const [node, path] = entry;

            const match = Emoji.getEmojiMatch(node.text);
            if (!match) return normalizeNode(...args);

            Transforms.wrapNodes(
                editor,
                Emoji.createEmoji(match.emojiCode),
                {
                    at: {
                        anchor: {
                            path,
                            offset: match.matchStart,
                        },
                        focus: {
                            path,
                            offset: match.matchEnd,
                        },
                    },
                    split: true,
                },
            );

            return;
        };

        return editor;
    },

    insertEmoji: (
        editor: RTETypes.Editor,
        code: EmojiStore.EmojiCodeWithAliases,
    ) => {
        Transforms.insertText(editor, code);
        editor.select(editor.selection ?? editor.end([]));
    },

    useInsertEmoji: () => {
        const editor = useSlate();

        const insert = useCallback((
            code: EmojiStore.EmojiCodeWithAliases,
        ) => {
            Emoji.insertEmoji(editor, code);
        }, [editor]);

        return {
            insert,
        };
    },
};