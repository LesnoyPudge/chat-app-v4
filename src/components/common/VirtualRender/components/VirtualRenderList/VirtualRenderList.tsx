import { useFunction, withDisplayName } from '@lesnoypudge/utils-react';
import { Fragment, memo, useMemo } from 'react';
import { ViewportList } from './components';
import { Types } from '../../types';
import { decorate } from '@lesnoypudge/macro';
import { never } from '@lesnoypudge/utils';



const getDefaultPrerenderCount = ({
    itemMargin = 0,
    itemSize = 0,
}: Pick<
    Types.List.Props<never>,
    'itemSize' | 'itemMargin'
>) => {
    const itemSizeApprox = itemSize <= 0 ? 20 : itemSize;

    const viewport = document.documentElement;
    const viewportHeight = viewport.clientHeight;
    const itemSizeWithMargin = itemSizeApprox + Math.max(0, itemMargin);

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
    items,
    count,
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
}: Types.List.Props<_Item>) => {
    const defaultInitialPrerender = useMemo(() => {
        if (initialPrerender !== undefined) return initialPrerender;

        return getDefaultPrerenderCount({
            itemMargin,
            itemSize,
        });
    }, [initialPrerender, itemMargin, itemSize]);

    const _children = useFunction((
        itemOrIndex: _Item | number,
        index: number | undefined,
        array: _Item[] | undefined,
    ) => {
        if (
            typeof itemOrIndex === 'number'
            && typeof count === 'number'
            && typeof index === 'number'
        ) {
            return (
                <Fragment key={getId(itemOrIndex)}>
                    {children(index)}
                </Fragment>
            );
        }

        if (
            typeof itemOrIndex !== 'number'
            && typeof count !== 'number'
            && typeof index === 'number'
            && array !== undefined
        ) {
            return (
                <Fragment key={getId(itemOrIndex, index)}>
                    {children(itemOrIndex, index, array)}
                </Fragment>
            );
        }

        never();
    });

    const withCache = !withoutCache;
    const directionToAxis: ViewportList.Types.PropsBase['axis'] = (
        direction === 'horizontal'
            ? 'x'
            : 'y'
    );

    return (
        <ViewportList.Node
            items={items}
            count={count as any}
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
        </ViewportList.Node>
    );
};