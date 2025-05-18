import { cn, logger } from '@/utils';
import { CSSProperties, FC, useEffect, useLayoutEffect } from 'react';
import './PlaceholderNode.scss';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { isDev } from '@/vars';
import { toOneLine } from '@lesnoypudge/utils';
import {
    useRefManager,
    useSynchronizedAnimation,
} from '@lesnoypudge/utils-react';



const ZERO_WIDTH_NON_JOINER = '\u200C';

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
    const elementRef = useRefManager<HTMLDivElement>(null);

    useSynchronizedAnimation(elementRef);

    if (isDev) {
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/rules-of-hooks
        useLayoutEffect(() => {
            if (!elementRef.current) return;

            const node = elementRef.current;
            const size = node.getBoundingClientRect();

            if (size.width !== 0 && size.height !== 0) return;

            logger._warns.log(toOneLine(`
                Placeholder node have incorrect size: 
                w: ${size.width}
                h: ${size.height}
            `));
            logger._warns.log(node);
            logger._warns.trace();
        }, [elementRef]);

        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/rules-of-hooks
        useEffect(() => {
            const node = elementRef.current;
            if (!node) return;

            node.getAnimations().forEach((animation) => {
                if (animation.startTime === 0) return;

                logger._warns.log(
                    'Found placeholder with non-zero animation start time',
                );
            });
        }, [elementRef]);
    }

    return (
        <div
            className={cn('PlaceholderNode', className)}
            style={style}
            aria-busy
            aria-live='polite'
            ref={elementRef}
        >
            {ZERO_WIDTH_NON_JOINER}
        </div>
    );
};