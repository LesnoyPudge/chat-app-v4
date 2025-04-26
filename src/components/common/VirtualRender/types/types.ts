import { Direction } from '@/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useRefManager } from '@lesnoypudge/utils-react';
import { CSSProperties, Dispatch, MutableRefObject, ReactNode, SetStateAction } from 'react';



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
        apiRef?: useRefManager.NullableRefManager<Api>;
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

    export type GetId = (item: string, index: number) => string | number;

    export type Options = {
        items: string[] | undefined;
        getId: GetId;
        viewportRef?: useRefManager.NullableRefManager<HTMLElement>;
        itemSize?: number;
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

    export type ChildrenArgs = [
        item: string,
        index: number,
        array: string[],
    ];

    export type WithChildren = RT.PropsWithRequiredRenderFunction<
        ChildrenArgs
    >;

    export namespace List {
        export type Props = T.Simplify<(
            Options
            & WithApi
            & WithChildren
        )>;
    }

    export namespace useVirtualArray {
        export type Return = {
            virtualList: string[];
            setVirtualIndexes: Dispatch<SetStateAction<[number, number]>>;
        };

        type Props = {
            originalArray: string[];
            overscan?: number;
        };

        export type Fn = (props: Props) => Return;
    }
}