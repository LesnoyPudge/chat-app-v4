import { FC } from 'react';
import { RenderElementProps } from 'slate-react';
import { RTETypes } from '../../../../../RTETypes';



export namespace RenderedParagraph {
    export type Props = (
        RenderElementProps
        & {
            element: RTETypes.Elements.Paragraph;
        }
    );
}

export const RenderedParagraph: FC<RenderedParagraph.Props> = ({
    attributes,
    children,
}) => {
    return (
        <p {...attributes}>
            {children}
        </p>
    );
};