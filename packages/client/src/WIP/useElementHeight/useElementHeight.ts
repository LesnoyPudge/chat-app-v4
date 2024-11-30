import { useResizeObserver, useUniqueState } from '@lesnoypudge/utils-react';



export const useElementHeight = (
    elementRefManager: Parameters<typeof useResizeObserver>[0],
) => {
    const [height, setHeight] = useUniqueState(0);

    useResizeObserver(elementRefManager, (entry) => {
        const size = entry.borderBoxSize[0];
        if (!size) return;

        setHeight(size.blockSize);
    });

    return {
        height,
    };
};