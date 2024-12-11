import { Emoji } from '@components';
import { createStyles } from '@utils';
import { FC } from 'react';
import { InlineChromiumBugfix } from '../InlineChromiumBugfix';
import { RenderElementProps } from 'slate-react';
import { RTETypes } from '../../../../../RTETypes';



const styles = createStyles({
    wrapper: `
        mx-0.5 
        inline-block 
        h-[--message-emoji-wrapper-height] 
        w-[--message-emoji-wrapper-width]
    `,
});

export namespace RenderedEmoji {
    export type Props = (
        RenderElementProps
        & {
            element: RTETypes.Elements.Emoji;
        }
    );
}

export const RenderedEmoji: FC<RenderedEmoji.Props> = ({
    attributes,
    children,
    element,
}) => {
    return (
        <span
            className={styles.wrapper}
            data-emoji={element.code}
            {...attributes}
            contentEditable={false}
        >
            <InlineChromiumBugfix/>

            {children}

            <span
                className='text-[0px]'
                contentEditable={false}
            >
                {element.code}
            </span>

            <Emoji.Node
                className='inline-block h-full w-full'
                code={element.code}
            />

            <InlineChromiumBugfix/>
        </span>
    );
};