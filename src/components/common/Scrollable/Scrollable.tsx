import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useMergeRefs, useRefManager } from '@lesnoypudge/utils-react';
import { OverlayScrollbars } from 'overlayscrollbars';
import { FC, MutableRefObject, RefObject } from 'react';
import { useInit, useDebug } from './hooks';
import 'overlayscrollbars/overlayscrollbars.css';
import './Scrollable.scss';
import { Direction } from '@/types';



const styles = createStyles({
    wrapper: 'max-h-full max-w-full',
});

export namespace Scrollable {
    export type Options = {
        autoHide?: boolean;
        withoutGutter?: boolean;
        size?: 'default' | 'small';
        direction?: Direction.All;
        withoutOppositeGutter?: boolean;
    };

    export type Instance = OverlayScrollbars;

    export type Api = {};

    export type WithExposedApi = {
        apiRef?: useRefManager.NullableRefManager<Api>;
    };

    export type WithScrollableRef = {
        scrollableRef?: RefObject<HTMLDivElement>;
    };

    export type WithViewportRef = {
        viewportRef?: RefObject<HTMLDivElement>;
    };

    export type Props = (
        RT.PropsWithChildrenAndClassName
        & Options
        & WithExposedApi
        & WithScrollableRef
        & WithViewportRef
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
    scrollableRef,
    viewportRef,
    children,
}) => {
    const {
        instanceRef,
        scrollableViewportRef,
        scrollableWrapperRef,
    } = useInit({
        autoHide,
        direction,
        size,
        withoutGutter,
        withoutOppositeGutter,
        apiRef,
    });

    useDebug({ instanceRef, className });

    const mergedScrollableRef = useMergeRefs([
        scrollableWrapperRef,
        scrollableRef,
    ]);

    const mergedViewportRef = useMergeRefs([
        scrollableViewportRef,
        viewportRef,
    ]);

    return (
        <div
            className={cn(styles.wrapper, className)}
            ref={mergedScrollableRef}
            data-scrollable={true}
            data-with-gutter={!withoutGutter}
            data-with-opposite-gutter={!withoutOppositeGutter}
            data-size={size}
            data-direction={direction}
            role='region'
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            aria-label={label}
        >
            <div ref={mergedViewportRef}>
                {children}
            </div>
        </div>
    );
};