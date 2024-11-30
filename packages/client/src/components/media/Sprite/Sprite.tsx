import { PropsWithClassName } from '@lesnoypudge/types-utils-react';
import { cn, createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    base: 'flex size-full shrink-0 transition-all',
});

export namespace Sprite {
    export type Props = (
        PropsWithClassName
        & {
            name: SpriteNames;
            style?: React.CSSProperties;
        }
    );
}

export const Sprite: FC<Sprite.Props> = ({
    className = '',
    name,
    style,
}) => {
    const id = `#${name}`;

    return (
        <svg className={cn(styles.base, className)} style={style}>
            <use xlinkHref={id}/>
        </svg>
    );
};