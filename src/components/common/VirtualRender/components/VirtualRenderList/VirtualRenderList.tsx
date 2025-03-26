import { isRef, useFunction, useLatest } from '@lesnoypudge/utils-react';
import { Fragment } from 'react';
import { ViewportList, ViewportListPropsBase } from 'react-viewport-list';
import { Types } from '../../types';



const getDefaultPrerenderCount = ({
    itemMargin,
    itemSize,
    viewportRef,
}: Pick<
    Required<Types.Options<unknown>>,
    'itemSize' | 'itemMargin' | 'viewportRef'
>) => {
    if (itemSize === 0) return 0;

    const viewport = (
        isRef(viewportRef)
            ? viewportRef.current ?? document.documentElement
            : viewportRef
    );
    const viewportHeight = viewport.clientHeight;
    const itemSizeWithMargin = itemSize + Math.max(0, itemMargin);

    return Math.ceil(viewportHeight / itemSizeWithMargin);
};

const DefaultRenderSpacer: Types.RenderSpacer = ({
    ref,
    style,
}) => {
    return (
        <div
            data-virtual-spacer
            ref={ref}
            style={style}
        >
        </div>
    );
};

export const VirtualRenderList = <_Item,>({
    apiRef,
    getId,
    direction = 'vertical',
    items = [],
    viewportRef,
    itemSize = 0,
    itemMargin = -1,
    overscan = 1,
    initialIndex = -1,
    initialAlignToTop = true,
    initialOffset = 0,
    initialDelay = -1,
    initialPrerender = getDefaultPrerenderCount({
        itemMargin,
        itemSize,
        viewportRef: viewportRef ?? document.documentElement,
    }),
    onViewportIndexesChange,
    overflowAnchor = 'auto',
    withoutCache = false,
    scrollThreshold = 0,
    indexesShift,
    getItemBoundingClientRect,
    children,
}: Types.List.Props<_Item>) => {
    const _viewportRef = useLatest(
        isRef(viewportRef) ? viewportRef.current : viewportRef,
    );
    // const _viewportRef = useConst(() => (
    //     isRef(viewportRef) ? viewportRef : { current: viewportRef }
    // ));

    const _children = useFunction((
        item: _Item,
        index: number,
        array: _Item[],
    ) => (
        <Fragment key={getId(item, index)}>
            {children(item, index, array)}
        </Fragment>
    ));

    const withCache = !withoutCache;
    const directionToAxis: ViewportListPropsBase['axis'] = (
        direction === 'horizontal'
            ? 'x'
            : 'y'
    );

    return (
        <ViewportList
            items={items}
            axis={directionToAxis}
            getItemBoundingClientRect={getItemBoundingClientRect}
            indexesShift={indexesShift}
            initialAlignToTop={initialAlignToTop}
            initialDelay={initialDelay}
            initialIndex={initialIndex}
            initialOffset={initialOffset}
            initialPrerender={initialPrerender}
            itemMargin={itemMargin}
            itemSize={itemSize}
            onViewportIndexesChange={onViewportIndexesChange}
            overflowAnchor={overflowAnchor}
            overscan={overscan}
            ref={apiRef}
            renderSpacer={DefaultRenderSpacer}
            scrollThreshold={scrollThreshold}
            // viewportRef={_viewportRef}
            withCache={withCache}
        >
            {_children}
        </ViewportList>
    );
};