import { FC } from 'react';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useConst } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@/utils';



const styles = createStyles({
    wrapper: `
        truncate
        text-xs 
        font-medium 
        text-color-muted
    `,
});

export namespace MessageTimestamp {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & {
            id: string;
            timestamp: number;
        }
    );
}

export const MessageTimestamp: FC<MessageTimestamp.Props> = ({
    className = '',
    id,
    timestamp,
    children,
}) => {
    const dateTime = useConst(() => (
        new Date(timestamp).toLocaleString()
    ));

    return (
        <time
            className={cn(styles.wrapper, className)}
            id={id}
            dateTime={dateTime}
        >
            {children}
        </time>
    );
};