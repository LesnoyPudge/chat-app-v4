import { useMemo, useRef, useState } from 'react';
import { Types } from '../../types';
import { shallowEqual } from '@lesnoypudge/utils';
import { useLatest } from '@lesnoypudge/utils-react';



const emptyArray: string[] = [];

export const useVirtualArray: Types.useVirtualArray.Fn = ({
    originalArray,
}) => {
    const [virtualIndexes, setVirtualIndexes] = useState([
        0,
        Math.max(0, originalArray.length - 1),
    ] as [number, number]);
    const prevRef = useRef<string[]>();
    const latestOriginalArrayRef = useLatest(originalArray);

    const [startIndex, endIndex] = virtualIndexes;
    const isCollapsed = startIndex === endIndex;
    const isLengthMoreThenOne = originalArray && originalArray.length > 1;
    const shouldReturnEmpty = isCollapsed && isLengthMoreThenOne;

    const virtualList = useMemo(() => {
        if (shouldReturnEmpty) return emptyArray;

        const list = latestOriginalArrayRef.current;

        const minIndex = 0;
        const maxInclusiveIndex = list.length;
        const startIndexWithOverscan = startIndex;
        const endInclusiveIndexWithOverscan = endIndex + 1;

        const newArray = list.slice(
            Math.max(minIndex, startIndexWithOverscan),
            Math.min(maxInclusiveIndex, endInclusiveIndexWithOverscan),
        );
        const prev = prevRef.current;

        if (prev && shallowEqual(prev, newArray)) {
            return prev;
        }

        prevRef.current = newArray;

        return newArray;
    }, [
        endIndex,
        shouldReturnEmpty,
        startIndex,
        latestOriginalArrayRef,
    ]);

    return {
        virtualList,
        setVirtualIndexes,
    };
};