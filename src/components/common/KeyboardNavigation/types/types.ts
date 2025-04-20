import { useEvent } from '@/hooks';
import { Direction } from '@/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useRefManager } from '@lesnoypudge/utils-react';
import { PropsWithChildren, RefObject } from 'react';



export namespace Types {
    export type MoveDirection = 'forward' | 'backward';

    export type onFocusChangeItem = {
        id: string;
        index: number;
    };

    export type MoveEventState = {
        isPrevented: boolean;
        prevent: () => void;
    };

    export type ListenerProps = {
        moveEventState: MoveEventState;
        prev: onFocusChangeItem | undefined;
        next: onFocusChangeItem;
        moveDirection: MoveDirection;
        isFromEvent: boolean;
    };

    export type OnFocusChange = (props: ListenerProps) => void;

    export type Options = {
        list: string[];
        direction?: Direction.Single;
        loop?: boolean;
        initialFocusedId?: string;
        onFocusChange?: OnFocusChange;
    };

    export type WithCurrentId = {
        currentFocusedId: string | undefined;
    };

    export type WithSetCurrentId = {
        setCurrentFocusedId: (newId: string) => void;
    };

    export type WrapperRef = useRefManager.NullableRefManager<HTMLElement>;

    export type WithWrapperRef = {
        wrapperRef: WrapperRef;
    };

    export type WithListeners = {
        on: useEvent.On<[ListenerProps]>;
        off: useEvent.Off<[ListenerProps]>;
    };

    export type withItemStateGetters = {
        getTabIndex: (id: string) => 0 | -1;
        getIsFocused: (id: string) => boolean;
    };

    export type Context = T.Simplify<(
        WithCurrentId
        & WithSetCurrentId
        & WithListeners
        & withItemStateGetters
    )>;

    export namespace Provider {
        export type Props = T.Simplify<(
            Options
            & WithWrapperRef
            & PropsWithChildren
        )>;
    }

    export namespace useCommonItem {
        export type Props = {
            elementRef: RefObject<HTMLElement>;
            itemId: string;
        };

        export type Return = {
            isCurrentId: boolean;
            isFocused: boolean;
            tabIndex: number;
            setFocusId: VoidFunction;
        };

        export type Fn = (props: Props) => Return;
    }

    export namespace useSetFocusId {
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
        export type Listener = (props: ListenerProps) => void;

        export type Fn = (
            nextItemId: string | null,
            listener: Listener
        ) => void;
    }

    export namespace useControls {
        export type Props = (
            WithWrapperRef
            & Options
        );

        export type Return = (
            WithCurrentId
            & WithSetCurrentId
            & WithListeners
            & withItemStateGetters
        );

        export type Fn = (props: Props) => Return;
    }
}