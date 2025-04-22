import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useRefManager } from '@lesnoypudge/utils-react';
import { PropsWithChildren, RefObject } from 'react';
import { KeyboardNavigationInstance } from '../instance';
import { Direction } from '@/types';



export namespace Types {
    export namespace Instance {
        export type Impl = KeyboardNavigationInstance;

        export type MoveDirection = 'forward' | 'backward';

        export type Item = {
            id: string;
            index: number;
        };

        export type EmptyItem = {
            id: undefined;
            index: number;
        };

        export type MaybeEmptyItem = Item | EmptyItem;

        export type ListenerProps = {
            prev: Item | undefined;
            next: MaybeEmptyItem;
            moveDirection: MoveDirection | undefined;
            isFromEvent: boolean;
        };

        export type OnIdChangeListener = (props: ListenerProps) => void;

        export type Options = {
            list: string[];
            loop: boolean;
            takeInitialIdFrom: 'start' | 'end';
        };

        export type UpdatableOptions = Partial<Options>;

        export type ConstructorProps = T.Simplify<(
            Partial<Options>
            & UpdatableOptions
        )>;
    }

    export type Context = {
        instance: Instance.Impl;
        currentId: Instance.Impl['currentId'];
    };

    export namespace Provider {
        export type Props = T.Simplify<(
            PropsWithChildren
            & Instance.ConstructorProps
            & {
                wrapperRef: useRefManager.NullableRefManager<HTMLElement>;
                direction?: Direction.Single;
                onIdChange?: Instance.OnIdChangeListener;
            }
        )>;
    }

    export namespace useCommonItem {
        export type Props = {
            elementRef: RefObject<HTMLElement>;
            itemId: string;
        };

        export type Return = {
            isCurrentId: boolean;
            tabIndex: number;
            setId: VoidFunction;
        };

        export type Fn = (props: Props) => Return;
    }

    export namespace useSetId {
        export type Fn = (itemId: string) => VoidFunction;
    }

    export namespace useIsCurrentId {
        export type Fn = (itemId: string) => boolean;
    }

    export namespace useIsFocused {
        export type Fn = (itemId: string) => boolean;
    }

    export namespace useTabIndex {
        export type Fn = (itemId: string) => number;
    }

    export namespace useOnMove {
        export type Listener = Instance.OnIdChangeListener;

        export type Fn = (
            nextItemId: string | null,
            listener: Listener
        ) => void;
    }

    export namespace useInstance {
        type Props = T.Except<Provider.Props, 'children'>;

        export type Fn = (props: Props) => Context;
    }
}