import { PropsWithClassName } from '@lesnoypudge/types-utils-react';
import { PropsWithInnerRef } from '@types';
import { cn, createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    base: 'flex size-full shrink-0 transition-all',
});

export namespace Sprite {
    export type Props = (
        PropsWithClassName
        & PropsWithInnerRef<'svg'>
        & {
            name: SpriteNames;
            style?: React.CSSProperties;
        }
    );
}

export const Sprite: FC<Sprite.Props> = ({
    className = '',
    name,
    innerRef,
    style,
}) => {
    const id = `#${name}`;

    return (
        <svg
            className={cn(styles.base, className)}
            style={style}
            ref={innerRef}
        >
            <use xlinkHref={id}/>
        </svg>
    );
};