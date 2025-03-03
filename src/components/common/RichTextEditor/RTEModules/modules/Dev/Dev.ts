import { isProd } from '@/vars';
import { Editor, Transforms, Element, Range, Text, Node } from 'slate';
import { RTETypes } from '../../../RTETypes';
import { RTEModules } from '../..';



export const Dev = {
    withDevWindow: ({ editor }: RTETypes.Helpers.WithEditor) => {
        if (isProd) return editor;

        if (!('slate' in window)) {
            // @ts-expect-error
            window.slate = {
                editor,
                Editor,
                RTEModules,
                Node,
                Text,
                Range,
                Element,
                Transforms,
            };
        }

        return editor;
    },
};