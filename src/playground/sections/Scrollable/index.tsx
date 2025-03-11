import { Scrollable } from '@/components';
import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbars, ClickScrollPlugin } from 'overlayscrollbars';



OverlayScrollbars.plugin(ClickScrollPlugin);

const ScrollableV2: FC<PropsWithChildren> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [initialize, instance] = useOverlayScrollbars({
        options: {
            overflow: {
                x: 'scroll',
                y: 'scroll',
            },
            paddingAbsolute: false,
            scrollbars: {
                clickScroll: true,
                dragScroll: true,
                visibility: 'visible',
            },
            update: {
                elementEvents: null,
                attributes: null,
            },
        },
        // events,
        defer: true,
    });

    useEffect(() => {
        if (!ref.current) return;
        initialize(ref.current);
    }, [initialize]);

    return (
        <div ref={ref} className='h-full'>
            {children}
        </div>
    );
};


export const ScrollableSection: FC = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollable = ref.current;
        if (!scrollable) return;

        // scrollable.tabIndex = -1;
    }, []);

    const content = (
        <div className='flex w-full flex-col gap-2 bg-red-950 [&>*]:shrink-0'>
            {Array.from({ length: 200 }).map((_, index) => {
                return (
                    <div key={index}>{index}</div>
                );
            })}
        </div>
    );

    return (
        <div className='flex h-dvh flex-col gap-4 p-4 outline-dashed outline-red-950'>
            {/* <Scrollable
                // className='h-full outline-dashed'
                // direction='horizontal'
                withOppositeGutter
                // innerRef={ref}
            >
                {content}
            </Scrollable> */}

            <ScrollableV2>
                {content}
            </ScrollableV2>
        </div>
    );
};