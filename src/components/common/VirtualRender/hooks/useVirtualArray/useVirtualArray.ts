import { useMemo, useState } from 'react';
import { Types } from '../../types';



export const useVirtualArray: Types.useVirtualArray.Fn = (
    originalArray,
) => {
    const [virtualIndexes, setVirtualIndexes] = useState([
        0,
        originalArray ? Math.max(0, originalArray.length - 1) : 0,
    ] as [number, number]);

    const [start, end] = virtualIndexes;
    const isSame = start === end;
    const isLengthMoreThenOne = originalArray && originalArray.length > 1;
    const shouldReturnEmpty = isSame && isLengthMoreThenOne;

    const virtualList = useMemo(() => {
        if (!originalArray) return [];
        if (shouldReturnEmpty) return [];

        const padding = 2;
        const endWithPadding = Math.min(originalArray.length, end + padding);

        return originalArray.slice(start, endWithPadding);
    }, [end, originalArray, shouldReturnEmpty, start]);

    return {
        virtualList,
        setVirtualIndexes,
    };
};