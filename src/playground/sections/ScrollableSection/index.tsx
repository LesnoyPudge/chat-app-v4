import { Scrollable } from '@/components';
import { FC, PropsWithChildren, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import 'overlayscrollbars/overlayscrollbars.css';
import {
    OverlayScrollbars,
    ClickScrollPlugin,
    ScrollbarsHidingPlugin,
} from 'overlayscrollbars';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { PropsWithInnerRef } from '@/types';
import { mergeRefs, useCounter, useMergeRefs, useRefManager } from '@lesnoypudge/utils-react';
import './ScrollableV2.scss';
import { cn } from '@/utils';

OverlayScrollbars.plugin(ClickScrollPlugin);
OverlayScrollbars.plugin(ScrollbarsHidingPlugin);

export namespace ScrollableV2 {
    export type Options = {
        autoHide?: boolean;
        withoutGutter?: boolean;
        size?: 'default' | 'small';
        direction?: 'vertical' | 'horizontal' | 'both';
        withoutOppositeGutter?: boolean;
        overlay?: boolean;
    };

    export type Props = (
        RT.PropsWithChildrenAndClassName
        & PropsWithInnerRef<'div'>
        & Options
        & {
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

const ScrollableV2: FC<ScrollableV2.Props> = ({
    className = '',
    // autoHide = false,
    // direction = 'vertical',
    // overlay = false,
    // size = 'default',
    // withoutOppositeGutter = false,
    // withoutGutter = false,
    innerRef,
    label,
    children,
}) => {
    const scrollableWrapper = useRef<HTMLDivElement>(null);
    const scrollableViewport = useRef<HTMLDivElement>(null);

    // const showXAxis = direction === 'horizontal' || direction === 'both';
    // const showYAxis = direction === 'vertical' || direction === 'both';

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
        }, OScrollbarOptions);

        console.log(instance.elements());

        return () => {
            instance.destroy();
        };
    }, []);

    // const [initialize, instance] = useOverlayScrollbars({
    //     options: {
    //         overflow: {
    //             x: showXAxis ? 'scroll' : 'hidden',
    //             y: showYAxis ? 'scroll' : 'hidden',
    //         },
    //         paddingAbsolute: true,
    //         scrollbars: {
    //             clickScroll: true,
    //             dragScroll: true,
    //             visibility: 'auto',
    //             autoHideSuspend: false,
    //             autoHideDelay: 3_000,
    //             autoHide: autoHide ? 'leave' : 'never',
    //             theme: 'os-theme-custom',
    //         },
    //         update: {
    //             elementEvents: null,
    //             attributes: null,
    //         },
    //     },
    //     // events,
    //     defer: false,
    // });

    // useEffect(() => {
    //     const wrapper = scrollableWrapper.current;
    //     const viewport = scrollableViewport.current;
    //     if (!wrapper || !viewport) return;


    //     initialize({
    //         target: wrapper,
    //         elements: {
    //             viewport,
    //             content: viewport,
    //         },
    //     });

    //     return () => {
    //         instance()?.destroy();
    //     };
    // }, [initialize, instance]);

    // const withGutter = !withoutGutter;
    // const withOppositeGutter = !withoutOppositeGutter;

    // const mergedRef = useMergeRefs([ref, innerRef]);

    return (
        <div
            className={cn('max-h-full max-w-full', className)}
            ref={scrollableWrapper}
            {...OScrollbarData}
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


const content = (
    <div
        className='min-h-full min-w-full bg-red-950 p-2.5'
        style={{
            width: 900,
        }}
    >
        <div
            className={`
                flex  
                flex-col gap-2 bg-black outline-dashed
                outline-1 outline-rose-200 [&>*]:shrink-0
            `}
        >
            {Array.from({ length: 200 }).map((_, index) => {
                return (
                    <button key={index}>{
                        index
                    // Array.from({ length: 200 }).map((_, index) => index)
                    }
                    </button>
                );
            })}
        </div>
    </div>
);

const OScrollbarOptions = {
    overflow: {
        x: 'scroll',
        y: 'scroll',
    },
    paddingAbsolute: true,
    scrollbars: {
        clickScroll: true,
        dragScroll: true,
        visibility: 'auto',
        autoHideSuspend: false,
        autoHideDelay: 3_000,
        autoHide: false ? 'leave' : 'never',
        theme: 'os-theme-custom',
    },
} as const;

const OScrollbarData = {
    'data-scrollable-1': true,
    'data-with-gutter': true,
    'data-with-opposite-gutter': true,
    'data-size': 'default',
    'data-overlay': false,
    'data-direction': 'both',
};

export const ScrollableSection: FC = () => {
    const counter = useCounter();

    return (
        <div className={`
            flex h-dvh flex-col gap-4 bg-green-600 p-4
        `}>
            <button onClick={() => counter.inc()}>
                <>inc {Math.random()}</>
            </button>

            {/* <SimpleBar
                className='outline-dashed outline-1 outline-red-700'
                style={{ maxHeight: 300 }}
                clickOnTrack
                autoHide={false}
                scrollbarMinSize={44}
                key={counter.count}
                {...{
                    'data-scrollable-2': true,
                    'data-with-gutter': true,
                    'data-with-opposite-gutter': true,
                    'data-size': 'default',
                    'data-overlay': false,
                    // 'data-direction': 'vertical',
                    // 'data-direction': 'horizontal',
                    'data-direction': 'both',
                }}
            >
                {content}
            </SimpleBar> */}

            {/* <Scrollable
                className='max-h-[300px]'
                direction='vertical'
                // withOppositeGutter
                size='default'
                // autoHide
                // innerRef={ref}
            >
                {content}
            </Scrollable> */}

            {/* fix flickering */}
            <Scrollable
                className='size-[300px]'
                size='default'
                direction='both'
                key={counter.count}
                autoHide
                // withoutOppositeGutter
            >
                {content}
            </Scrollable>

            {/* <OverlayScrollbarsComponent
                key={counter.count}
                {...OScrollbarData}
                className=''
                options={OScrollbarOptions}
            >
                {content}
            </OverlayScrollbarsComponent> */}
        </div>
    );
};