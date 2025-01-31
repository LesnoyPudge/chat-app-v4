import { logger } from '@utils';
import { ReactElement, ReactNode } from 'react';
import { Text } from 'slate';
import {
    RenderElementProps,
    RenderLeafProps,
    RenderPlaceholderProps,
} from 'slate-react';
import { RTEModules } from '../..';
import { RTETypes } from '../../../RTETypes';
import {
    RenderedEmoji,
    RenderedLink,
    RenderedParagraph,
    RenderedPlaceholder,
    SerializedEmoji,
    SerializedLeaf,
    SerializedLink,
    SerializedParagraph,
    RenderedLeaf,
} from './components';



export const Render = {
    renderElement: ({
        element,
        ...props
    }: RenderElementProps): ReactElement => {
        switch (true) {
            case RTEModules.Emoji.isEmoji(element): {
                return (
                    <RenderedEmoji
                        {...props}
                        element={element}
                    />
                );
            }

            case RTEModules.Link.isLink(element): {
                return (
                    <RenderedLink
                        {...props}
                        element={element}
                    />
                );
            }

            case RTEModules.Paragraph.isParagraph(element): {
                return (
                    <RenderedParagraph
                        {...props}
                        element={element}
                    />
                );
            }

            default: {
                logger.error('unhandled rendering element type');
                return <></>;
            }
        }
    },

    renderLeaf: ({
        attributes,
        children,
    }: RenderLeafProps): ReactElement => {
        return (
            <RenderedLeaf attributes={attributes}>
                {children}
            </RenderedLeaf>
        );
    },

    renderPlaceholder: ({
        attributes,
        children,
    }: RenderPlaceholderProps): ReactElement => {
        return (
            <RenderedPlaceholder attributes={attributes}>
                {children}
            </RenderedPlaceholder>
        );
    },

    serialize: (() => {
        const loop = (node: RTETypes.Node, index: number): ReactNode => {
            const key = index;

            if (Text.isText(node)) return (
                <SerializedLeaf key={key}>
                    {node.text}
                </SerializedLeaf>
            );

            const children = node.children.map(loop);

            switch (true) {
                case RTEModules.Paragraph.isParagraph(node): {
                    return (
                        <SerializedParagraph key={key}>
                            {children}
                        </SerializedParagraph>
                    );
                }

                case RTEModules.Emoji.isEmoji(node): {
                    return (
                        <SerializedEmoji element={node}/>
                    );
                }

                case RTEModules.Link.isLink(node): {
                    return (
                        <SerializedLink element={node}>
                            {children}
                        </SerializedLink>
                    );
                }

                default: {
                    logger.error('unhandled element serialization');
                    return null;
                }
            }
        };

        return (nodes: RTETypes.Nodes) => {
            return nodes.map(loop);
        };
    })(),
};