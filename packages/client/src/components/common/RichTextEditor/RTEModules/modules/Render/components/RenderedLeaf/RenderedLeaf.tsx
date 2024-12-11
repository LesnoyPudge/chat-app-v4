import { FC } from 'react';
import { RenderLeafProps } from 'slate-react';



export namespace RenderedLeaf {
    export type Props = Pick<
        RenderLeafProps,
        'attributes'
        | 'children'
    >;
}

export const RenderedLeaf: FC<RenderedLeaf.Props> = ({
    attributes,
    children,
}) => {
    return (
        <span {...attributes}>
            {children}
        </span>
    );
};