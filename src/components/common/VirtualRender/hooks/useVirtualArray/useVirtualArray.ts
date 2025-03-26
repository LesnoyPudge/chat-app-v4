import { useState } from 'react';
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

    const virtualList = (
        originalArray
            ? shouldReturnEmpty
                ? []
                : originalArray.slice(virtualIndexes[0], virtualIndexes[1] + 1)
            : []
    );

    return {
        virtualList,
        setVirtualIndexes,
    };
};