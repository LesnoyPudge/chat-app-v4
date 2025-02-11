import { useKeyboardNavigation } from '@hooks';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { deepEqual } from '@lesnoypudge/utils';
import {
    Focus,
    Iterate,
    renderFunction,
    useConst,
    useRefManager,
    useScrollIntoView,
} from '@lesnoypudge/utils-react';
import { memo } from 'react';



export namespace CustomizableListV2 {
    type GetId = (index: number) => string;

    export type RequiredProps<_Item> = {
        items: _Item[];
        getId: GetId;
    };

    type OptionsTemplate<_IsEnabled, _With> = (
        _IsEnabled
        | _With
    );

    export type BaseFlags = {
        withKeyboardNavigation: boolean;
    };

    export type WithWrapperRef = {
        wrapperRef: useRefManager.RefManager<HTMLElement>;
    };

    export type Options<_Flags extends BaseFlags> = {
        scrollIntoView?: OptionsTemplate<boolean, Pick<
            useScrollIntoView.Options,
            'behavior' | 'horizontal' | 'vertical'
        >>;

        keyboardNavigation?: OptionsTemplate<
            _Flags['withKeyboardNavigation'],
            Pick<
                useKeyboardNavigation.Options,
                'direction' | 'initialFocusedId' | 'loop' | 'onFocusChange'
            >
            & WithWrapperRef
        >;
    };

    type KeyboardNavigationChildrenProps<_Flags extends BaseFlags> = (
        _Flags['withKeyboardNavigation'] extends true ? (
            {
                isFocused: boolean;
                tabIndex: number;
            }
            & Pick<
                useKeyboardNavigation.Return,
                'setCurrentFocusedId'
            >
        ) : {}
    );

    export type ChildrenProps<_Item, _Flags extends BaseFlags> = (
        {
            item: _Item;
            index: number;
            itemRef: useRefManager.RefManager<any>;
        }
        & KeyboardNavigationChildrenProps<_Flags>
    );

    export type WithChildren<
        _Item,
        _Flags extends BaseFlags,
    > = RT.PropsWithRenderFunction<
        [ChildrenProps<_Item, _Flags>]
    >;

    export type Props<_Item, _Flags extends BaseFlags> = (
        RequiredProps<_Item>
        & Options<_Flags>
        & WithChildren<_Item, _Flags>
        // & WithWrapperRef
        // & T.Except<useKeyboardNavigation.Options, 'list'>
    );
}

namespace BaseItem {
    export type Props = (
        CustomizableListV2.WithChildren<any>
        & Pick<
            CustomizableListV2.ChildrenProps<any>,
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
}: BaseItem.Props) => {
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

export const CustomizableListV2 = <
    _Item,
    _Flags extends CustomizableListV2.BaseFlags,
>({
    getId,
    items,
    keyboardNavigation,
    scrollIntoView,
    children,
}: CustomizableListV2.Props<_Item, _Flags>) => {
    const flags: CustomizableListV2.BaseFlags = useConst(() => ({
        withKeyboardNavigation: !!keyboardNavigation,
    }));

    let keyboardNavigationResult: useKeyboardNavigation.Return | undefined;

    if (flags.withKeyboardNavigation) {
        keyboardNavigationResult = useKeyboardNavigation(
            keyboardNavigation,
        );
    }

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