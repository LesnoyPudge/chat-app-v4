import { Direction } from '@/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { Dispatch, RefObject, SetStateAction } from 'react';
import { ViewportList } from '../components/VirtualRenderList/components';



export namespace Types {
    export type ScrollToIndexOptions = ViewportList.Types.ScrollToIndexOptions;

    export type Api = ViewportList.Types.Api;

    export type OnViewportIndexesChange = NonNullable<
        ViewportList.Types.PropsBase['onViewportIndexesChange']
    >;

    export type RenderSpacer = NonNullable<
        ViewportList.Types.PropsBase['renderSpacer']
    >;

    export type GetIdWithList<_Item> = (
        item: _Item, index: number
    ) => string | number;

    export type GetIdWithCount = (
        index: number
    ) => string | number;

    export namespace List {
        type BaseProps = T.Simplify<(
            T.Except<
                ViewportList.Types.PropsBase,
                'axis' | 'withCache' | 'renderSpacer'
            >
            & {
                apiRef?: RefObject<ViewportList.Types.Api>;
                direction?: Direction.Single;
                withoutCache?: boolean;
            }
        )>;

        export type PropsWithCount = (
            BaseProps
            & ViewportList.Types.WithCount
            & {
                getId: GetIdWithCount;
            }
        );

        export type PropsWithList<_Item> = (
            BaseProps
            & ViewportList.Types.WithItems<_Item>
            & {
                getId: GetIdWithList<_Item>;
            }
        );

        export type Props<_Item> = T.Simplify<(
            PropsWithCount
            | PropsWithList<_Item>
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