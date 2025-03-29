import { PropsWithClassName } from '@lesnoypudge/types-utils-react';
import { PropsWithInnerRef } from '@/types';
import { cn, createStyles } from '@/utils';
import { FC, memo } from 'react';
import { ASSETS } from '@/generated/ASSETS';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { decorate } from '@lesnoypudge/macro';
import { withDisplayName } from '@lesnoypudge/utils-react';



const styles = createStyles({
    base: 'flex size-full shrink-0 transition-all',
});

export namespace Sprite {
    export type Props = (
        PropsWithClassName
        & PropsWithInnerRef<'svg'>
        & {
            sprite: T.ValueOf<ASSETS['IMAGES']['SPRITE']>;
            style?: React.CSSProperties;
        }
    );
}

decorate(withDisplayName, 'Sprite', decorate.target);
decorate(memo, decorate.target);

export const Sprite: FC<Sprite.Props> = ({
    className = '',
    sprite,
    innerRef,
    style,
}) => {
    const id = `#${sprite.NAME}`;

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