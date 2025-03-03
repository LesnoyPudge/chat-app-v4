import { useKeyboardNavigation } from '@/hooks';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useRefManager, useScrollIntoView } from '@lesnoypudge/utils-react';



export namespace Base {
    export namespace Wrapper {
        type GetId<_Item> = (item: _Item, index: number) => string;

        export type ItemProps<_Item> = {
            item: _Item;
            index: number;
            id: string;
        };

        // eslint-disable-next-line @/typescript-eslint/no-explicit-any
        export type ChildrenProps<_Item = any> = (
            ItemProps<_Item>
            & {
                // eslint-disable-next-line @/typescript-eslint/no-explicit-any
                itemRef: useRefManager.NullableRefManager<any>;
            }
        );

        export type WithChildren<_Props> = (
            RT.PropsWithRenderFunction<[props: _Props]>
        );

        export type BasicProps<_Item> = {
            items: _Item[];
            getId: GetId<_Item>;
        };
    }

    export namespace Item {
        export type Props<_Extended = object> = (
            // eslint-disable-next-line @/typescript-eslint/no-explicit-any
            Wrapper.ItemProps<any>
            & Wrapper.WithChildren<Wrapper.ChildrenProps & _Extended>
        );
    }
}

export namespace Features {
    export namespace WrapperProps {
        type WithWrapperRef = {
            wrapperRef: useRefManager.NullableRefManager<HTMLElement>;
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