import { useKeyboardNavigation } from '@hooks';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { deepEqual, inArray } from '@lesnoypudge/utils';
import {
    Focus,
    Iterate,
    renderFunction,
    useFunction,
    useRefManager,
    useScrollIntoView,
} from '@lesnoypudge/utils-react';
import { memo } from 'react';



namespace Base {
    export namespace Wrapper {
        type GetId<_Item> = (item: _Item, index: number) => string;

        export type ItemProps<_Item> = {
            item: _Item;
            index: number;
            id: string;
        };

        type ChildrenProps<_Item> = (
            ItemProps<_Item>
            & {
                itemRef: useRefManager.RefManager<any>;
            }
        );

        export type WithChildren<_Item, _Extended = {}> = (
            RT.PropsWithRenderFunction<[props: (
                ChildrenProps<_Item>
                & _Extended
            )]>
        );

        export type BasicProps<_Item> = {
            items: _Item[];
            getId: GetId<_Item>;
        };
    }

    export namespace Item {
        export type Props<_Extended = {}> = (
            Wrapper.ItemProps<any>
            & Wrapper.WithChildren<any, _Extended>
        );
    }
}

namespace Features {
    export namespace WrapperProps {
        type WithWrapperRef = {
            wrapperRef: useRefManager.RefManager<HTMLElement>;
        };

        export type WithKeyboardNavigation = {
            keyboardNavigation: (
                WithWrapperRef
                & Pick<
                    useKeyboardNavigation.Options,
                    'direction' | 'initialFocusedId' | 'loop' | 'onFocusChange'
                >
            );
        };

        export type WithScrollIntoView = {
            scrollIntoView?: Pick<
                useScrollIntoView.Options,
                'behavior' | 'horizontal' | 'vertical'
            >;
        };
    }

    export namespace ItemProps {
        export type WithKeyboardNavigation = (
            Pick<useKeyboardNavigation.Return, 'setCurrentFocusedId'>
            & {
                isFocused: boolean;
                tabIndex: number;
            }
        );

        export type WithScrollIntoView = WrapperProps.WithScrollIntoView;
    }

    export namespace ChildrenProps {
        export type WithKeyboardNavigation = {
            isFocused: boolean;
            tabIndex: number;
            setFocusId: VoidFunction;
        };
    }
}

namespace Variant1 {
    type SharedChildrenProps = (
        Features.ChildrenProps.WithKeyboardNavigation
    );

    export namespace Wrapper {
        export type Props<_Item> = (
            Base.Wrapper.BasicProps<_Item>
            & Base.Wrapper.WithChildren<_Item, SharedChildrenProps>
            & Features.WrapperProps.WithKeyboardNavigation
            & Features.WrapperProps.WithScrollIntoView
        );
    }

    export namespace Item {
        export type Props = (
            & Base.Item.Props<SharedChildrenProps>
            & Features.ItemProps.WithKeyboardNavigation
            & Features.ItemProps.WithScrollIntoView
        );
    }
}

const ItemVariant1 = memo(({
    children,
    index,
    item,
    isFocused,
    scrollIntoView,
    tabIndex,
    id,
    setCurrentFocusedId,
}: Variant1.Item.Props) => {
    const itemRef = useRefManager<HTMLElement>(null);

    useScrollIntoView(itemRef, {
        enabled: isFocused,
        ...scrollIntoView,
    });

    Focus.useMoveFocusInside({
        containerRef: itemRef,
        isEnabled: isFocused,
    });

    const setFocusId = useFunction(() => {
        setCurrentFocusedId(id);
    });

    return renderFunction(children, {
        index,
        item,
        itemRef,
        tabIndex,
        isFocused,
        setFocusId,
        id,
        scrollIntoView,
    });
}, deepEqual);

const WrapperVariant1 = <_Item,>({
    getId,
    items,
    keyboardNavigation,
    scrollIntoView,
    children,
}: Variant1.Wrapper.Props<_Item>) => {
    const {
        getIsFocused,
        getTabIndex,
        setCurrentFocusedId,
    } = useKeyboardNavigation(keyboardNavigation.wrapperRef, {
        list: items.map((_, index) => getId(inArray(items, index), index)),
        ...keyboardNavigation,
    });

    return (
        <Iterate items={items}>
            {(item, index) => {
                const id = getId(inArray(items, index), index);

                return (
                    <ItemVariant1
                        index={index}
                        item={item}
                        key={id}
                        isFocused={getIsFocused(id)}
                        tabIndex={getTabIndex(id)}
                        id={id}
                        setCurrentFocusedId={setCurrentFocusedId}
                        scrollIntoView={scrollIntoView}
                    >
                        {children}
                    </ItemVariant1>
                );
            }}
        </Iterate>
    );
};

export namespace ListVariants {
    export namespace Variant1 {
        export import Types = Variant1;

        export const List = WrapperVariant1;
    }
}