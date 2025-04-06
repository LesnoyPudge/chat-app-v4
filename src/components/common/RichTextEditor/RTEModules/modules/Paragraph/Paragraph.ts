import { Element } from 'slate';
import { RTETypes } from '../../../types';



export const Paragraph = {
    createParagraph: (
        children: RTETypes.Nodes,
    ): RTETypes.Elements.Paragraph => {
        return {
            type: 'paragraph',
            children,
        };
    },

    withParagraph: ({ editor }: RTETypes.Helpers.WithEditor) => {
        return editor;
    },

    isParagraph: (node: unknown): node is RTETypes.Elements.Paragraph => {
        return Element.isElement(node) && node.type === 'paragraph';
    },
};