import { useMemo, useRef, useState } from 'react';
import { Types } from '../../types';
import { shallowEqual } from '@lesnoypudge/utils';
import { useLatest } from '@lesnoypudge/utils-react';



const emptyArray: string[] = [];

export const useVirtualArray: Types.useVirtualArray.Fn = (
    originalArray,
) => {
    const [virtualIndexes, setVirtualIndexes] = useState([
        0,
        Math.max(0, originalArray.length - 1),
    ] as [number, number]);
    const prevRef = useRef<string[]>();
    const latestOriginalArrayRef = useLatest(originalArray);

    const [start, end] = virtualIndexes;
    const isCollapsed = start === end;
    const isLengthMoreThenOne = originalArray && originalArray.length > 1;
    const shouldReturnEmpty = isCollapsed && isLengthMoreThenOne;

    const virtualList = useMemo(() => {
        if (shouldReturnEmpty) return emptyArray;

        const newArray = latestOriginalArrayRef.current.slice(start, end);
        const prev = prevRef.current;

        if (prev && shallowEqual(prev, newArray)) {
            return prev;
        }

        prevRef.current = newArray;

        return newArray;
    }, [end, shouldReturnEmpty, start, latestOriginalArrayRef]);

    return {
        virtualList,
        setVirtualIndexes,
    };
};