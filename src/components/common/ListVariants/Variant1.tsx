import { useKeyboardNavigation } from '@/hooks';
import { deepEqual, inArray } from '@lesnoypudge/utils';
import {
    Focus,
    Iterate,
    renderFunction,
    useFunction,
    useRefManager,
    useScrollIntoView,
    withDisplayName,
} from '@lesnoypudge/utils-react';
import { FC, memo } from 'react';
import type { Base, Features } from './shared';
import { decorate } from '@lesnoypudge/macro';


export namespace Variant1 {
    export type ChildrenProps<_Item> = (
        Base.Wrapper.ChildrenProps<_Item>
        & Features.ChildrenProps.WithKeyboardNavigation
    );

    export type WithChildren<_Item> = (
        Base.Wrapper.WithChildren<ChildrenProps<_Item>>
    );

    export namespace Wrapper {
        export type Props<_Item> = (
            Base.Wrapper.BasicProps<_Item>
            & Base.Wrapper.WithChildren<ChildrenProps<_Item>>
            & Features.WrapperProps.WithKeyboardNavigation
            & Features.WrapperProps.WithScrollIntoView
        );
    }

    export namespace Item {
        export type Props = (
            & Base.Item.Props<Features.ChildrenProps.WithKeyboardNavigation>
            & Features.ItemProps.WithKeyboardNavigation
            & Features.ItemProps.WithScrollIntoView
        );
    }
}

decorate(withDisplayName, 'ItemVariant1', decorate.target);
decorate(memo, decorate.target);

const ItemVariant1: FC<Variant1.Item.Props> = ({
    children,
    index,
    item,
    isFocused,
    scrollIntoView,
    tabIndex,
    id,
    setCurrentFocusedId,
}) => {
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
};

export const WrapperVariant1 = <_Item,>({
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