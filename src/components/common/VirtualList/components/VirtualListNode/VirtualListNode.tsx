import { KeyboardNavigation, VirtualRender } from '@/components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useFunction } from '@lesnoypudge/utils-react';



export namespace VirtualListNode {
    type KeyboardNavigationNonIntersectingProps = (
        Exclude<
            keyof KeyboardNavigation.Types.Provider.Props,
            keyof VirtualRender.Types.List.Props
            | 'list'
        >
    );

    export type Props = T.Simplify<(
        Pick<
            KeyboardNavigation.Types.Provider.Props,
            KeyboardNavigationNonIntersectingProps
        >
        & VirtualRender.Types.List.Props
    )>;
}

export const VirtualListNode = ({
    items = [],
    getId,
    wrapperRef,
    children,
    ...rest
}: VirtualListNode.Props) => {
    const {
        setVirtualIndexes,
        virtualList,
    } = VirtualRender.useVirtualArray({
        originalArray: items,
        overscan: rest.overscan,
    });

    const {
        direction,
        loop,
        onIdChange,
        takeInitialIdFrom,
        onViewportIndexesChange,
        ...virtualRenderProps
    } = rest;

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
                {...virtualRenderProps}
                items={items}
                getId={getId}
                onViewportIndexesChange={handleViewportIndexesChange}
            >
                {children}
            </VirtualRender.List>
        </KeyboardNavigation.Provider>
    );
};