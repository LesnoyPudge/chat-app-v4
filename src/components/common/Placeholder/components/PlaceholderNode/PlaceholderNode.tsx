import { cn, logger } from '@/utils';
import { CSSProperties, FC, useLayoutEffect } from 'react';
import './PlaceholderNode.scss';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { isDev } from '@/vars';
import { toOneLine } from '@lesnoypudge/utils';
import { useRefManager, useSynchronizedAnimation } from '@lesnoypudge/utils-react';



export namespace PlaceholderNode {
    export type Props = (
        RT.PropsWithClassName
        & {
            style?: CSSProperties;
        }
    );
}

export const PlaceholderNode: FC<PlaceholderNode.Props> = ({
    className = '',
    style,
}) => {
    const ref = useRefManager<HTMLDivElement>(null);

    useSynchronizedAnimation(ref);

    if (isDev) {
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/rules-of-hooks
        useLayoutEffect(() => {
            if (!ref.current) return;

            const node = ref.current;
            const size = node.getBoundingClientRect();

            if (size.width !== 0 && size.height !== 0) return;

            logger._warns.log(toOneLine(`
                Placeholder node have incorrect size: 
                w: ${size.width}
                h: ${size.height}
            `));
            logger._warns.log(node);
            logger._warns.trace();
        }, [ref]);
    }

    return (
        <div
            className={cn('PlaceholderNode', className)}
            style={style}
            aria-busy
            aria-live='polite'
            ref={ref}
        >
            {/* ZERO WIDTH NON-JOINER */}
            {'\u200C'}

            {/* <br/> */}
        </div>
    );
};