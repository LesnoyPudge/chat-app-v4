import { KeyboardNavigation, VirtualRender } from '@/components';
import { T } from '@lesnoypudge/types-utils-base/namespace';



export namespace VirtualListNode {
    type KeyboardNavigationNonIntersectingProps = (
        Exclude<
            keyof KeyboardNavigation.Types.Provider.Props,
            keyof VirtualRender.Types.List.Props<unknown>
            | 'list'
        >
    );

    export type Props<_Item> = T.Simplify<(
        Pick<
            KeyboardNavigation.Types.Provider.Props,
            KeyboardNavigationNonIntersectingProps
        >
        & T.Except<
            VirtualRender.Types.List.Props<_Item>,
            'onViewportIndexesChange'
        >
    )>;
}

export const VirtualListNode = <_Item,>({
    items = [],
    getId,
    wrapperRef,
    children,
    ...rest
}: VirtualListNode.Props<_Item>) => {
    const {
        setVirtualIndexes,
        virtualList,
    } = VirtualRender.useVirtualArray(items);

    return (
        <KeyboardNavigation.Provider
            {...rest}
            // list={items.map((v, i) => String(getId(v, i)))}
            list={virtualList.map((v, i) => String(getId(v, i)))}
            wrapperRef={wrapperRef}
            onFocusChange={({ next }) => {
                console.log(next);
            }}
        >
            <VirtualRender.List
                {...rest}
                items={items}
                getId={getId}
                onViewportIndexesChange={setVirtualIndexes}
            >
                {children}
            </VirtualRender.List>
        </KeyboardNavigation.Provider>
    );
};