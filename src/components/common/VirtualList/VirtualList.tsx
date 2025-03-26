import { KeyboardNavigation, VirtualRender } from '@/components';



export namespace VirtualList {
    type KeyboardNavigationNonIntersectingProps = (
        Exclude<
            keyof KeyboardNavigation.Types.Provider.Props,
            keyof VirtualRender.Types.List.Props<unknown> | 'list'
        >
    );

    export type Props<_Item> = (
        Pick<
            KeyboardNavigation.Types.Provider.Props,
            KeyboardNavigationNonIntersectingProps
        >
        & VirtualRender.Types.List.Props<_Item>
    );
}

export const VirtualList = <_Item,>({
    items,
    getId,
    wrapperRef,
    children,
    ...rest
}: VirtualList.Props<_Item>) => {
    const {
        setVirtualIndexes,
        virtualList,
    } = VirtualRender.useVirtualArray(items);

    return (
        <KeyboardNavigation.Provider
            list={virtualList.map((v, i) => String(getId(v, i)))}
            wrapperRef={wrapperRef}
            {...rest}
        >
            <VirtualRender.List
                items={items}
                getId={getId}
                onViewportIndexesChange={setVirtualIndexes}
                {...rest}
            >
                {children}
            </VirtualRender.List>
        </KeyboardNavigation.Provider>
    );
};