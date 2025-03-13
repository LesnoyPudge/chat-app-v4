import { PropsWithInnerRef } from '@/types';
import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { mutate, useRefManager } from '@lesnoypudge/utils-react';
import {
    OverlayScrollbars,
    ClickScrollPlugin,
    ScrollbarsHidingPlugin,
} from 'overlayscrollbars';
import { FC, useRef, useLayoutEffect } from 'react';



OverlayScrollbars.plugin(ClickScrollPlugin);
OverlayScrollbars.plugin(ScrollbarsHidingPlugin);

const createApi = (instance: OverlayScrollbars): Scrollable.Api => {
    return {};
};

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

    export type Api = {};

    export type Props = (
        RT.PropsWithChildrenAndClassName
        & Options
        & {
            apiRef?: useRefManager.NullableRefManager<Api>;
            label?: string;
        }
    );

    export namespace useScrollable {
        export type Props = Required<Options>;

        export type Return = {
            scrollableRef: useRefManager.NullableRefManager<HTMLDivElement>;
        };

        export namespace Hooks {
            export type Props = (
                useScrollable.Props
                & useScrollable.Return
            );
        }
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
    const instanceRef = useRef<OverlayScrollbars>(null);
    const scrollableWrapper = useRef<HTMLDivElement>(null);
    const scrollableViewport = useRef<HTMLDivElement>(null);

    // initialization
    useLayoutEffect(() => {
        const wrapper = scrollableWrapper.current;
        const viewport = scrollableViewport.current;
        if (!wrapper || !viewport) return;

        const instance = OverlayScrollbars({
            target: wrapper,
            elements: {
                host: wrapper,
                content: viewport,
                viewport,
            },
        }, {});

        instanceRef.current = instance;

        return () => {
            instance.destroy();
            instanceRef.current = null;
        };
    }, [apiRef]);

    // option update
    useLayoutEffect(() => {
        const instance = instanceRef.current;
        if (!instance) return;

        const showXAxis = direction === 'horizontal' || direction === 'both';
        const showYAxis = direction === 'vertical' || direction === 'both';

        instance.options({
            overflow: {
                x: showXAxis ? 'scroll' : 'hidden',
                y: showYAxis ? 'scroll' : 'hidden',
            },
            paddingAbsolute: true,
            scrollbars: {
                clickScroll: true,
                dragScroll: true,
                visibility: 'auto',
                autoHideSuspend: false,
                autoHideDelay: 3_000,
                autoHide: autoHide ? 'leave' : 'never',
                theme: 'os-theme-custom',
            },
        });
    }, [autoHide, direction]);

    // api exposure
    useLayoutEffect(() => {
        if (!apiRef) return;

        const instance = instanceRef.current;
        if (!instance) return;

        mutate(apiRef, 'current', createApi(instance));

        return () => {
            mutate(apiRef, 'current', null);
        };
    }, [apiRef]);

    return (
        <div
            className={cn(styles.wrapper, className)}
            ref={scrollableWrapper}
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
                ref={scrollableViewport}
            >
                {children}
            </div>
        </div>
    );
};