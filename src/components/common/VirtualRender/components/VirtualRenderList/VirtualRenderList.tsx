import { useFunction, withDisplayName } from '@lesnoypudge/utils-react';
import { Fragment, memo, useMemo } from 'react';
import { ViewportList, ViewportListPropsBase } from 'react-viewport-list';
import { Types } from '../../types';
import { decorate } from '@lesnoypudge/macro';



const getDefaultPrerenderCount = ({
    itemMargin,
    itemSize,
}: Pick<
    Required<Types.Options>,
    'itemSize' | 'itemMargin'
>) => {
    if (itemSize === 0) return 1;

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

export const VirtualRenderList = ({
    apiRef,
    getId,
    direction = 'vertical',
    items = [],
    itemSize,
    itemMargin,
    viewportRef,
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
}: Types.List.Props) => {
    const defaultInitialPrerender = useMemo(() => {
        if (initialPrerender !== undefined) return initialPrerender;

        return getDefaultPrerenderCount({
            itemMargin,
            itemSize,
        });
    }, [initialPrerender, itemMargin, itemSize]);

    const _children = useFunction((
        item: string,
        index: number,
        array: string[],
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
            viewportRef={viewportRef}
            ref={apiRef}
            renderSpacer={DefaultRenderSpacer}
            scrollThreshold={scrollThreshold}
            withCache={withCache}
        >
            {_children}
        </ViewportList>
    );
};