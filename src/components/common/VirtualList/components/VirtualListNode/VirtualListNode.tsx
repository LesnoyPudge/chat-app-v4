import { KeyboardNavigation, VirtualRender } from '@/components';
import { useFunction } from '@lesnoypudge/utils-react';
import { Types } from '../../types';
import { useMemo, useRef } from 'react';



export const VirtualListNode = ({
    items = [],
    getId,
    wrapperRef,
    children,
    direction,
    loop,
    onIdChange,
    takeInitialIdFrom,
    onViewportIndexesChange,
    ...virtualRenderProps
}: Types.Node.Props) => {
    const {
        setVirtualIndexes,
        virtualList,
    } = VirtualRender.useVirtualArray({
        originalArray: items,
    });

    const handleViewportIndexesChange: (
        VirtualRender.Types.OnViewportIndexesChange
    ) = useFunction((indexes) => {
        setVirtualIndexes(indexes);
        onViewportIndexesChange?.(indexes);
    });

    return (
        <KeyboardNavigation.Provider
            list={virtualList}
            wrapperRef={wrapperRef}
            direction={direction}
            loop={loop}
            onIdChange={onIdChange}
            takeInitialIdFrom={takeInitialIdFrom}
        >
            <VirtualRender.List
                direction={direction}
                items={items}
                getId={getId}
                onViewportIndexesChange={handleViewportIndexesChange}
                {...virtualRenderProps}
            >
                {children}
            </VirtualRender.List>
        </KeyboardNavigation.Provider>
    );
};