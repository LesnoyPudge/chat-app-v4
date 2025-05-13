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
    wrapper: 'max-h-full max-w-[100dvw]',
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

    export type Api = Instance;

    export type WithExposedApi = {
        apiRef?: useRefManager.NullableRefManager<Api>;
    };

    export type WithScrollableRef = {
        scrollableRef?: RefObject<HTMLDivElement>;
    };

    export type WithWrapperRef = {
        wrapperRef?: RefObject<HTMLDivElement>;
    };

    export type Props = (
        RT.PropsWithChildrenAndClassName
        & Options
        & WithExposedApi
        & WithScrollableRef
        & WithWrapperRef
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
    wrapperRef,
    children,
}) => {
    const initData = useInit({
        autoHide,
        direction,
        size,
        withoutGutter,
        withoutOppositeGutter,
        apiRef,
    });

    useDebug({ instanceRef: initData.instanceRef, className });

    const mergedWrapperRef = useMergeRefs([
        initData.wrapperRef,
        wrapperRef,
    ]);

    const mergedScrollableRef = useMergeRefs([
        initData.scrollableRef,
        scrollableRef,
    ]);

    const withGutter = !withoutGutter;
    const withOppositeGutter = withGutter && !withoutOppositeGutter;

    return (
        <div
            className={cn(styles.wrapper, className)}
            ref={mergedWrapperRef}
            data-scrollable-wrapper={true}
            data-with-gutter={withGutter}
            data-with-opposite-gutter={withOppositeGutter}
            data-size={size}
            data-direction={direction}
            data-auto-hide={autoHide}
            data-overlayscrollbars='host'
        >
            <div
                ref={mergedScrollableRef}
                role='region'
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={0}
                aria-label={label}
                data-overlayscrollbars-viewport
            >
                {children}
            </div>
        </div>
    );
};