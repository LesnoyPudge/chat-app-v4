

import { T } from '@lesnoypudge/types-utils-base/namespace';
import { shallowEqual } from '@lesnoypudge/utils';
import { logger } from '@utils';
import { isProd } from '@vars';
import { useEffect, useRef } from 'react';



const empty = {} as T.UnknownRecord;

const getDiff = (prev: T.UnknownRecord, next: T.UnknownRecord) => {
    const diff = {};

    [
        ...Object.keys(prev),
        ...Object.keys(next),
    ].reduce<T.UnknownRecord>((acc, cur) => {
        if (next[cur] !== prev[cur]) {
            acc[cur] = next[cur];
        }

        return acc;
    }, {});

    return diff;
};

export const usePropsChange = (props: T.UnknownRecord) => {
    const prevRef = useRef(empty);

    useEffect(() => {
        if (isProd) return;

        if (prevRef.current === empty) {
            prevRef.current = props;
            return;
        }

        const diff = getDiff(prevRef.current, props);
        const isEqual = shallowEqual(prevRef.current, props);

        !isEqual && logger.log('diff is:', diff);

        prevRef.current = props;
    });
};