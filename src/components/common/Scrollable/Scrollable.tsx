import { FC } from 'react';
import css from './Scrollable.module.scss';
import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { PropsWithInnerRef } from '@/types';
import { isDev } from '@/vars';
import { mergeRefs } from '@lesnoypudge/utils-react';
import { useScrollable } from './useScrollable';



const useScrollableDebug = (
    isDev
        ? await import('./debug/useScrollableDebug').then((v) => v.default)
        : () => null
);

const styles = createStyles({
    // scrollable: 'max-h-[min(100%,100dvh)] max-w-[min(100%,100dvw)]',
    scrollable: 'max-h-full max-w-full',
});

export namespace Scrollable {
    export type Options = {
        autoHide?: boolean;
        withoutGutter?: boolean;
        size?: 'default' | 'small' | 'hidden';
    };

    type StableProps = (
        RT.PropsWithChildrenAndClassName
        & PropsWithInnerRef<'div'>
        & Options
        & {
            label?: string;
        }
    );

    type ConditionalProps = (
        {
            direction?: 'vertical' | 'both';
            withOppositeGutter?: boolean;
        }
        | {
            direction?: 'horizontal';
            withOppositeGutter?: false;
        }
    );

    export type Props = (
        StableProps
        & ConditionalProps
    );
}

export const Scrollable: FC<Scrollable.Props> = ({
    className = '',
    innerRef,
    label = 'Scrollable region',
    direction = 'vertical',
    size = 'default',
    withOppositeGutter = false,
    withoutGutter = false,
    autoHide = false,
    children,
}) => {
    const debugRef = useScrollableDebug({
        autoHide,
        size,
    });
    const { scrollableRef } = useScrollable({
        autoHide,
        size,
        withoutGutter,
    });

    const notHorizontal = direction !== 'horizontal';
    const withGutter = !withoutGutter;

    const data = {
        'data-with-opposite-gutter': (
            withGutter
            && notHorizontal
            && withOppositeGutter
        ),
        'data-size': size,
        'data-direction': direction,
        'data-with-gutter': withGutter && notHorizontal,
    };

    return (
        <div
            className={cn(
                css.Scrollable,
                styles.scrollable,
                className,
            )}
            role='region'
            aria-label={label}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            ref={mergeRefs(
                debugRef,
                scrollableRef,
                innerRef,
            )}
            {...data}
        >
            {children}
        </div>
    );
};