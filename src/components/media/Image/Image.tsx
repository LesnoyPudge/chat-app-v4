import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@/utils';
import { FC, ReactEventHandler } from 'react';



const styles = createStyles({
    image: 'h-auto w-full max-w-full shrink-0 object-cover',
});

export namespace Image {
    export type Props = (
        RT.PropsWithClassName
        & {
            src: string | null | undefined;
            lazy?: boolean;
            alt?: string;
            style?: React.CSSProperties;
            onLoad?: ReactEventHandler<HTMLImageElement>;
            onError?: ReactEventHandler<HTMLImageElement>;
        }
    );
}

export const Image: FC<Image.Props> = ({
    className = '',
    style,
    src,
    alt = '',
    lazy = false,
    onLoad,
    onError,
}) => {
    const loading = lazy ? 'lazy' : 'eager';

    return (
        <img
            className={cn(styles.image, className)}
            style={style}
            src={src ?? ''}
            alt={alt}
            loading={loading}
            decoding='async'
            draggable='false'
            contentEditable='false'
            onLoad={onLoad}
            onError={onError}
        />
    );
};