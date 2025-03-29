import { useFunction, withDisplayName } from '@lesnoypudge/utils-react';
import { Fragment, memo, useMemo } from 'react';
import { ViewportList, ViewportListPropsBase } from 'react-viewport-list';
import { Types } from '../../types';
import { decorate } from '@lesnoypudge/macro';



const getDefaultPrerenderCount = ({
    itemMargin,
    itemSize,
}: Pick<
    Required<Types.Options<unknown>>,
    'itemSize' | 'itemMargin'
>) => {
    if (itemSize === 0) return 0;

    const viewport = document.documentElement;
    const viewportHeight = viewport.clientHeight;
    const itemSizeWithMargin = itemSize + Math.max(0, itemMargin);

    const initialPrerender = Math.ceil(viewportHeight / itemSizeWithMargin);

    return initialPrerender;
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

decorate(withDisplayName, 'VirtualRenderList', decorate.target);
decorate(memo, decorate.target);

export const VirtualRenderList = <_Item,>({
    apiRef,
    getId,
    direction = 'vertical',
    items = [],
    // viewportRef,
    itemSize = 0,
    itemMargin = -1,
    overscan = 1,
    initialIndex = -1,
    initialAlignToTop = true,
    initialOffset = 0,
    initialDelay = -1,
    initialPrerender,
    onViewportIndexesChange,
    overflowAnchor = 'auto',
    withoutCache = false,
    scrollThreshold = 0,
    indexesShift = 0,
    getItemBoundingClientRect,
    children,
}: Types.List.Props<_Item>) => {
    const defaultInitialPrerender = useMemo(() => {
        if (initialPrerender !== undefined) return initialPrerender;

        return getDefaultPrerenderCount({
            itemMargin,
            itemSize,
        });
    }, [initialPrerender, itemMargin, itemSize]);

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
            initialPrerender={defaultInitialPrerender}
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