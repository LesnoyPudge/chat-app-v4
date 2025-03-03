import { Editor, Transforms } from 'slate';
import { logger } from '@/utils';
import { RTETypes } from '../../../RTETypes';
import { RTEModules } from '../..';



export const CharacterLimit = {
    withCharacterLimit: ({
        editor,
        maxLength,
    }: RTETypes.Helpers.WithEditor<RTETypes.Plugins.WithCharacterLimit>) => {
        const { onChange } = editor;

        const getNumberOfCharsToDelete = () => {
            const text = Editor.string(editor, [], { voids: true });
            return text.length - maxLength;
        };

        const next = () => {
            const left = getNumberOfCharsToDelete();
            if (left > 0) return deleteLoop(left);
        };

        const deleteLoop = (charsLeft: number): void => {
            const lastEntry = Editor.last(editor, []);

            const isSimpleText = RTEModules.Text.isSimpleText(
                editor, lastEntry,
            );
            if (isSimpleText) {
                const [lastNode, lastPath] = lastEntry;

                if (lastNode.text.length >= charsLeft) {
                    Transforms.delete(editor, {
                        at: {
                            path: lastPath,
                            offset: lastNode.text.length,
                        },
                        distance: charsLeft,
                        reverse: true,
                        unit: 'character',
                    });

                    return next();
                }

                if (
                    RTEModules.Text.isEmpty(lastNode)
                    && !RTEModules.Text.isSpacerText(editor, lastEntry)
                ) {
                    const parent = Editor.parent(editor, lastPath);

                    Transforms.removeNodes(editor, {
                        at: parent[1],
                        match: (node) => RTEModules.Utils.isBlockElement(
                            editor,
                            node,
                        ),
                    });

                    return next();
                }

                Transforms.removeNodes(editor, {
                    at: lastPath,
                });

                return next();
            }

            const isEditableElementText = RTEModules.Text.isEditableElementText(
                editor,
                lastEntry,
            );
            if (isEditableElementText) {
                const [lastNode, lastPath] = lastEntry;

                if (lastNode.text.length >= charsLeft) {
                    Transforms.delete(editor, {
                        at: {
                            path: lastPath,
                            offset: lastNode.text.length,
                        },
                        distance: charsLeft,
                        reverse: true,
                        unit: 'character',
                    });

                    return next();
                }

                const parentEntry = Editor.parent(editor, lastPath);

                Transforms.removeNodes(editor, {
                    at: parentEntry[1],
                    voids: true,
                });

                return next();
            }

            const isReadOnlyElementText = RTEModules.Text.isReadOnlyElementText(
                editor,
                lastEntry,
            );
            if (isReadOnlyElementText) {
                const [, lastPath] = lastEntry;
                const [, parentPath] = Editor.parent(editor, lastPath);

                Transforms.removeNodes(editor, {
                    at: parentPath,
                    voids: true,
                });

                return next();
            }

            logger.warn('character limit deletion is not handled');
        };

        editor.onChange = (options) => {
            const op = options?.operation;

            const shouldContinue = (
                !op
                || (
                    op.type === RTEModules.Operations.INSERT_TEXT
                    || op.type === RTEModules.Operations.INSERT_NODE
                    || op.type === RTEModules.Operations.SPLIT_NODE
                )
            );
            if (!shouldContinue) return onChange(options);

            const charsToDelete = getNumberOfCharsToDelete();
            if (charsToDelete <= 0) return onChange(options);

            Editor.withoutNormalizing(editor, () => {
                deleteLoop(charsToDelete);
            });

            return onChange(options);
        };

        return editor;
    },
};