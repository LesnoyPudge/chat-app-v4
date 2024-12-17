import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useRefManager, useSynchronizedAnimation } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    wrapper: 'animate-pulse bg-primary-400',
});

export namespace PlaceholderWrapper {
    export type Props = (
        RT.PropsWithChildrenAndClassName
        & {
            title?: string;
            style?: React.CSSProperties;
            disable?: boolean;
        }
    );
}

export const PlaceholderWrapper: FC<PlaceholderWrapper.Props> = ({
    className = '',
    title = 'Loading...',
    style,
    disable = false,
    children,
}) => {
    const elementToSyncRef = useRefManager<HTMLDivElement>(null);

    useSynchronizedAnimation(elementToSyncRef);

    const enable = !disable;

    return (
        <div
            className={cn({
                [styles.wrapper]: enable,
            }, className)}
            style={style}
            title={enable ? title : undefined}
            ref={elementToSyncRef}
        >
            {children}
        </div>
    );
};