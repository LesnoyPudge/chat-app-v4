import { FC } from 'react';
import { InlineChromiumBugfix } from '../InlineChromiumBugfix';
import { RenderElementProps } from 'slate-react';
import { RTETypes } from '../../../../../RTETypes';
import { createStyles } from '@/utils';



const styles = createStyles({
    base: 'text-color-link',
});

export namespace RenderedLink {
    export type Props = (
        RenderElementProps
        & {
            element: RTETypes.Elements.Link;
        }
    );
}

export const RenderedLink: FC<RenderedLink.Props> = ({
    attributes,
    element,
    children,
}) => {
    return (
        <span
            className={styles.base}
            data-url={element.url}
            {...attributes}
        >
            <InlineChromiumBugfix/>

            {children}

            <InlineChromiumBugfix/>
        </span>
    );
};