import { createStyles } from '@utils';
import { FC } from 'react';
import { RenderPlaceholderProps } from 'slate-react';



const styles = createStyles({
    base: 'translate-y-1/2',
});

export namespace RenderedPlaceholder {
    export type Props = RenderPlaceholderProps;
}

export const RenderedPlaceholder: FC<RenderedPlaceholder.Props> = ({
    attributes,
    children,
}) => {
    return (
        <span
            className={styles.base}
            {...attributes}
        >
            {children}
        </span>
    );
};