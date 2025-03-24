import { Scrollable, VirtualRender } from '@/components';
import { useCounter, useInterval } from '@lesnoypudge/utils-react';
import { FC, memo, useMemo, useRef, useState } from 'react';
import { ViewportList } from 'react-viewport-list';



const Item: FC<{ id: number }> = memo(({ id }) => {
    const count = useRef(0);
    const [state, setState] = useState(0);

    // useInterval(() => setState((prev) => prev + 1), 1_500);

    count.current++;

    return <div>part1 - item - {id} - {count.current} - {state}</div>;
});

export const VirtualRenderTest: FC = () => {
    const viewportRef = useRef<HTMLDivElement>(null);
    const counter = useCounter(200);
    const items = useMemo(() => {
        return Array.from({ length: counter.count }).map((_, i) => i);
    }, [counter.count]);

    // const part1 = items.slice(0, items.length / 2);
    // const part2 = items.slice(items.length / 2);

    return (
        <Scrollable scrollableRef={viewportRef} className='max-h-[500px]'>
            <div className='flex flex-col gap-2'>
                <button onClick={() => counter.inc()}>
                    <>wow {counter.count}</>
                </button>

                <VirtualRender
                    viewportRef={viewportRef}
                    items={items}
                    getId={(item) => item}
                    direction='vertical'
                    indexesShift={0}
                    itemSize={24}
                    // itemMargin={8}
                >
                    {(item) => (
                        <Item id={item}/>
                    )}
                </VirtualRender>

                {/* <ViewportList items={part2}>
                    {(item) => (
                        <div key={item}>part2 - item - {item}</div>
                    )}
                </ViewportList> */}
            </div>
        </Scrollable>
    );
};