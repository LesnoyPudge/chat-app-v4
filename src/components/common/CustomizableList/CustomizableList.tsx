import { useKeyboardNavigation } from '@hooks';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { deepEqual } from '@lesnoypudge/utils';
import { Focus, Iterate, renderFunction, useRefManager, useScrollIntoView } from '@lesnoypudge/utils-react';
import { memo } from 'react';



export namespace CustomizableList {
    type GetId = (index: number) => string;

    export type ChildrenProps<_Item> = (
        {
            item: _Item;
            index: number;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            itemRef: useRefManager.RefManager<any>;
            isFocused: boolean;
            tabIndex: number;
        }
        & Pick<
            useKeyboardNavigation.Return,
            'setCurrentFocusedId'
        >
    );

    export type WithChildren<_Item> = RT.PropsWithRenderFunction<
        [ChildrenProps<_Item>]
    >;

    export type WithWrapperRef = {
        wrapperRef: useRefManager.RefManager<HTMLElement>;
    };

    export type Props<_Item> = (
        {
            items: _Item[];
            getId: GetId;
        }
        & WithChildren<_Item>
        & WithWrapperRef
        & T.Except<useKeyboardNavigation.Options, 'list'>
    );
}

namespace BaseItem {
    export type Props<_Item> = (
        CustomizableList.WithChildren<_Item>
        & Pick<
            CustomizableList.ChildrenProps<_Item>,
            'item'
            | 'index'
            | 'isFocused'
            | 'tabIndex'
            | 'setCurrentFocusedId'
        >
    );
}

const BaseItem = memo(({
    children,
    index,
    item,
    isFocused,
    setCurrentFocusedId,
    tabIndex,
}: BaseItem.Props<any>) => {
    const itemRef = useRefManager<HTMLElement>(null);

    useScrollIntoView(itemRef, {
        enabled: isFocused,
    });

    Focus.useMoveFocusInside({
        containerRef: itemRef,
        isEnabled: isFocused,
    });

    return renderFunction(children, {
        index,
        item,
        itemRef,
        tabIndex,
        isFocused,
        setCurrentFocusedId,
    });
}, deepEqual);

export const CustomizableList = <_Item,>({
    getId,
    items,
    wrapperRef,
    children,
    ...options
}: CustomizableList.Props<_Item>) => {
    const {
        getIsFocused,
        getTabIndex,
        setCurrentFocusedId,
    } = useKeyboardNavigation(wrapperRef, {
        list: items.map((_, index) => getId(index)),
        ...options,
    });

    return (
        <Iterate items={items}>
            {(item, index) => {
                const key = getId(index);

                return (
                    <BaseItem
                        index={index}
                        item={item}
                        key={key}
                        isFocused={getIsFocused(key)}
                        tabIndex={getTabIndex(key)}
                        setCurrentFocusedId={setCurrentFocusedId}
                    >
                        {children}
                    </BaseItem>
                );
            }}
        </Iterate>
    );
};