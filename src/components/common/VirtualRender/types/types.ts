import { Direction } from '@/types';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { CSSProperties, Dispatch, MutableRefObject, ReactNode, RefObject, SetStateAction } from 'react';



export namespace Types {
    export type ScrollToIndexOptions = {
        index?: number;
        alignToTop?: boolean;
        offset?: number;
        delay?: number;
        prerender?: number;
    };

    export type Api = {
        scrollToIndex: (options: ScrollToIndexOptions) => void;
        getScrollPosition: () => {
            index: number;
            offset: number;
        };
    };

    export type WithApi = {
        apiRef?: MutableRefObject<Api | null>;
    };

    export type OnViewportIndexesChange = (
        (viewportIndexes: [number, number]) => void
    );

    export type RenderSpacer = (props: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref: MutableRefObject<any>;
        style: CSSProperties;
        type: 'top' | 'bottom';
    }) => ReactNode;

    export type GetItemBoundingClientRect = (
        element: Element
    ) => (
        DOMRect
        | {
            bottom: number;
            left: number;
            right: number;
            top: number;
            width: number;
            height: number;
        }
    );

    export type OverflowAnchor = 'none' | 'auto';

    export type GetId<_Item> = (item: _Item, index: number) => string | number;

    export type Options<_Item> = {
        items: _Item[] | undefined;
        getId: GetId<_Item>;
        // viewportRef?: RefObject<HTMLElement | null> | HTMLElement;
        itemSize: number;
        itemMargin?: number;
        overscan?: number;
        direction?: Direction.Single;
        initialIndex?: ScrollToIndexOptions['index'];
        initialAlignToTop?: ScrollToIndexOptions['alignToTop'];
        initialOffset?: ScrollToIndexOptions['offset'];
        initialDelay?: ScrollToIndexOptions['delay'];
        initialPrerender?: ScrollToIndexOptions['prerender'];
        onViewportIndexesChange?: OnViewportIndexesChange;
        overflowAnchor?: OverflowAnchor;
        withoutCache?: boolean;
        scrollThreshold?: number;
        indexesShift?: number;
        getItemBoundingClientRect?: GetItemBoundingClientRect;
    };

    export type ChildrenArgs<_Item> = [
        item: _Item,
        index: number,
        array: _Item[],
    ];

    export type WithChildren<_Item> = RT.PropsWithRequiredRenderFunction<
        ChildrenArgs<_Item>
    >;

    export namespace List {
        export type Props<_Item> = (
            Options<_Item>
            & WithApi
            & WithChildren<_Item>
        );
    }

    export namespace useVirtualArray {
        export type Return<_Item> = {
            virtualList: _Item[];
            setVirtualIndexes: Dispatch<SetStateAction<[number, number]>>;
        };

        export type Fn = <_Item>(
            originalArray: _Item[] | undefined
        ) => Return<_Item>;
    }
}