import { FC, PropsWithChildren } from 'react';
import { RTETypes } from '../../../../../types';
import { ExternalLink } from '@/components';
import { createStyles } from '@/utils';


const styles = createStyles({
    base: 'text-color-link',
});

export namespace SerializedLink {
    export type Props = (
        PropsWithChildren
        & {
            element: RTETypes.Elements.Link;
        }
    );
}

export const SerializedLink: FC<SerializedLink.Props> = ({
    element,
    children,
}) => {
    return (
        <ExternalLink
            className={styles.base}
            href={element.url}
        >
            {children}
        </ExternalLink>
    );
};