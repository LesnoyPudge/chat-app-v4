import { FC, useRef } from 'react';
import './Scrollable.scss';
import { cn, createStyles } from '@utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { PropsWithInnerRef } from '@types';
import { isDev } from '@vars';
import { mergeRefs } from '@lesnoypudge/utils-react';
import { noop } from '@lesnoypudge/utils';



const useScrollableDebug = (
    isDev
        ? await import('./debug/useScrollableDebug').then((v) => v.default)
        : noop
);

const baseClassName = 'Scrollable';

const styles = createStyles({
    scrollable: 'max-h-full max-w-full',
});

export namespace Scrollable {
    type StableProps = (
        RT.PropsWithChildrenAndClassName
        & PropsWithInnerRef<'div'>
        & {
            withoutGutter?: boolean;
            label?: string;
            size?: 'default' | 'small' | 'hidden';
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
    children,
}) => {
    const debugRef = useRef<HTMLDivElement>(null);

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

    useScrollableDebug(debugRef);

    return (
        <div
            className={cn(
                baseClassName,
                styles.scrollable,
                className,
            )}
            role='region'
            aria-label={label}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            ref={mergeRefs(
                debugRef,
                innerRef,
            )}
            {...data}
        >
            {children}
        </div>
    );
};