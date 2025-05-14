import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles, resolveImagePath } from '@/utils';
import { FC, memo, ReactEventHandler } from 'react';
import { decorate } from '@lesnoypudge/macro';
import { withDisplayName } from '@lesnoypudge/utils-react';
import { T } from '@lesnoypudge/types-utils-base';



const styles = createStyles({
    image: 'size-full max-w-full shrink-0 object-cover',
});

const EMPTY_SRC = '__EMPTY__';

export namespace Image {
    type Conditional = (
        {
            pointer: resolveImagePath.ImagePointer;
            src?: never;
        }
        | {
            pointer?: never;
            src: string | null | undefined;
        }
    );

    export type Props = T.Simplify<(
        RT.PropsWithClassName
        & Conditional
        & {
            lazy?: boolean;
            alt?: string;
            style?: React.CSSProperties;
            onLoad?: ReactEventHandler<HTMLImageElement>;
            onError?: ReactEventHandler<HTMLImageElement>;
        }
    )>;
}

decorate(withDisplayName, 'Image', decorate.target);
decorate(memo, decorate.target);

export const Image: FC<Image.Props> = ({
    className = '',
    style,
    pointer,
    src,
    alt = '',
    lazy = false,
    onLoad,
    onError,
}) => {
    const loading = lazy ? 'lazy' : 'eager';

    const _src = src ?? resolveImagePath(pointer) ?? EMPTY_SRC;

    return (
        <img
            className={cn(styles.image, className)}
            style={style}
            src={_src}
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