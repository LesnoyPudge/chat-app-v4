import { KeyboardNavigation, VirtualRender } from '@/components';
import { T } from '@lesnoypudge/types-utils-base/namespace';



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
        & T.Except<
            VirtualRender.Types.List.Props,
            'onViewportIndexesChange'
        >
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
    } = VirtualRender.useVirtualArray(items);

    const {
        direction,
        initialFocusedId,
        loop,
        onFocusChange,
        ...virtualRenderProps
    } = rest;

    return (
        <KeyboardNavigation.Provider
            list={virtualList}
            wrapperRef={wrapperRef}
            direction={direction}
            initialFocusedId={initialFocusedId}
            loop={loop}
            onFocusChange={onFocusChange}
        >
            <VirtualRender.List
                {...virtualRenderProps}
                items={items}
                getId={getId}
                onViewportIndexesChange={setVirtualIndexes}
            >
                {children}
            </VirtualRender.List>
        </KeyboardNavigation.Provider>
    );
};