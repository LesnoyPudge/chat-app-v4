import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useRefManager } from '@lesnoypudge/utils-react';
import { OverlayScrollbars } from 'overlayscrollbars';
import { FC, MutableRefObject } from 'react';
import { useInit, useDebug } from './hooks';
import 'overlayscrollbars/overlayscrollbars.css';
import './Scrollable.scss';



const styles = createStyles({
    wrapper: 'max-h-full max-w-full',
});

export namespace Scrollable {
    export type Options = {
        autoHide?: boolean;
        withoutGutter?: boolean;
        size?: 'default' | 'small';
        direction?: 'vertical' | 'horizontal' | 'both';
        withoutOppositeGutter?: boolean;
    };

    export type Instance = OverlayScrollbars;

    export type Api = {};

    export type WithExposedApi = {
        apiRef?: useRefManager.NullableRefManager<Api>;
    };

    export type Props = (
        RT.PropsWithChildrenAndClassName
        & Options
        & WithExposedApi
        & {
            label?: string;
        }
    );

    export namespace Hooks {
        export type Options = Required<Scrollable.Options>;

        export type WithInstanceRef = {
            instanceRef: MutableRefObject<Scrollable.Instance | null>;
        };
    }
}

export const Scrollable: FC<Scrollable.Props> = ({
    className = '',
    autoHide = false,
    direction = 'vertical',
    size = 'default',
    withoutOppositeGutter = false,
    withoutGutter = false,
    apiRef,
    label,
    children,
}) => {
    const options: Scrollable.Hooks.Options = {
        autoHide,
        direction,
        size,
        withoutGutter,
        withoutOppositeGutter,
    };

    const {
        instanceRef,
        scrollableViewportRef,
        scrollableWrapperRef,
    } = useInit({ ...options, apiRef });

    useDebug({ instanceRef, className });

    return (
        <div
            className={cn(styles.wrapper, className)}
            ref={scrollableWrapperRef}
            data-scrollable={true}
            data-with-gutter={!withoutGutter}
            data-with-opposite-gutter={!withoutOppositeGutter}
            data-size={size}
            data-direction={direction}
        >
            <div
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={0}
                aria-label={label}
                ref={scrollableViewportRef}
            >
                {children}
            </div>
        </div>
    );
};