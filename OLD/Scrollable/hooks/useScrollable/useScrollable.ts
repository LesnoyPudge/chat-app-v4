import { useRefManager } from '@lesnoypudge/utils-react';
import { Scrollable } from '@/components';
import { useAutoHide, useOppositeGutter } from './hooks';


export const useScrollable = (
    props: Scrollable.useScrollable.Props,
): Scrollable.useScrollable.Return => {
    const scrollableRef = useRefManager<HTMLDivElement>(null);

    const hookProps = {
        scrollableRef,
        ...props,
    };

    useAutoHide(hookProps);

    useOppositeGutter(hookProps);

    return {
        scrollableRef,
    };
};