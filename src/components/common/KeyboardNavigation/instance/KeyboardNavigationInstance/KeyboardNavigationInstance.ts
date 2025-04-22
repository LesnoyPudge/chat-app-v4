import { Direction } from '@/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { invariant, ListenerStore } from '@lesnoypudge/utils';



export type MoveDirection = 'forward' | 'backward';

type Item = {
    id: string;
    index: number;
};

type EmptyItem = {
    id: undefined;
    index: number;
};

type MaybeEmptyItem = Item | EmptyItem;

export type ListenerProps = {
    prev: Item | undefined;
    next: MaybeEmptyItem;
    moveDirection: MoveDirection | undefined;
    isFromEvent: boolean;
};

type OnIdChangeListener = (props: ListenerProps) => void;

type Options = {
    list: string[];
    direction: Direction.Single;
    loop: boolean;
    initialFocusedId: string | undefined;
    takeInitialIdFrom: 'start' | 'end';
};

type UpdatableOptions = Pick<Options, 'list'>;

type ConstructorProps = T.Simplify<(
    Partial<Options>
    & UpdatableOptions
)>;

export class KeyboardNavigationInstance {
    private currentId: string | undefined;
    private currentIndex: number;
    private options: Options;
    private listeners: ListenerStore<null, [ListenerProps]>;

    constructor(props: ConstructorProps) {
        this.options = this.withDefaultProps(props);
        this.listeners = new ListenerStore();

        const item = (
            this.validateId(this.getInitialId())
            ?? this.getEmptyItem()
        );

        this.currentId = item.id;
        this.currentIndex = item.index;
    }

    getId() {
        return this.currentId;
    }

    setId(newId: string) {
        const newItem = this.validateId(newId);

        if (!newItem) return;

        const prevItem = this.getCurrentItem();

        this.notify({
            isFromEvent: false,
            moveDirection: undefined,
            next: newItem,
            prev: prevItem,
        });
    }

    eventMove(props: Pick<ListenerProps, 'moveDirection'>) {
        if (!this.options.list.length) return;

        const { nextIndex, prevIndex } = this.getPossibleIndexes();

        const isForward = props.moveDirection === 'forward';
        const newIndex = isForward ? nextIndex : prevIndex;
        const newId = this.options.list[newIndex];
        invariant(newId);

        const prevItem = this.getCurrentItem();

        this.notify({
            isFromEvent: true,
            moveDirection: props.moveDirection,
            prev: prevItem,
            next: {
                id: newId,
                index: newIndex,
            },
        });
    }

    withDefaultProps(
        props: Partial<ConstructorProps>,
    ) {
        return {
            list: props.list ?? [],
            direction: props.direction ?? 'vertical',
            initialFocusedId: props.initialFocusedId ?? props.list?.[0],
            loop: props.loop ?? false,
            takeInitialIdFrom: props.takeInitialIdFrom ?? 'start',
        };
    }

    updateOptions(options: UpdatableOptions) {
        const derivedItem = this.deriveNewItem(options);

        Object.assign(this.options, options);

        if (derivedItem.id === this.currentId) return;

        const prevItem = this.getCurrentItem();

        this.notify({
            isFromEvent: false,
            moveDirection: undefined,
            next: derivedItem,
            prev: prevItem,
        });
    }

    onIdChange(listener: OnIdChangeListener) {
        return this.listeners.add(null, listener);
    }

    private getEmptyItem(): EmptyItem {
        return {
            id: undefined,
            index: -1,
        };
    }

    private getCurrentItem(): Item | undefined {
        if (!this.currentId) return;

        return {
            id: this.currentId,
            index: this.currentIndex,
        };
    }

    private validateId(id: string | undefined): Item | undefined {
        if (!id) return;

        const index = this.options.list.indexOf(id);

        return {
            id,
            index,
        };
    }

    private deriveNewItem(options: UpdatableOptions): MaybeEmptyItem {
        const newList = options.list;
        const isSameList = newList === this.options.list;
        if (isSameList) {
            const currentItem = this.getCurrentItem();
            invariant(currentItem);

            return currentItem;
        }

        const isListEmpty = newList.length === 0;
        if (isListEmpty) return this.getEmptyItem();
        // list not empty

        const newItem = this.validateId(this.currentId);
        if (newItem) return newItem;
        // list not empty but current id is invalid

        const newIndex = Math.min(
            newList.length - 1,
            this.currentIndex,
        );

        const newId = newList[newIndex];

        return this.validateId(newId) ?? this.getEmptyItem();
    }

    private getPossibleIndexes() {
        const listLength = this.options.list.length;
        invariant(listLength !== 0);

        const currentIndex = this.currentIndex;

        if (listLength === 1) return {
            nextIndex: currentIndex,
            prevIndex: currentIndex,
        };

        if (!this.options.loop) {
            const nextIndex = Math.min(listLength - 1, currentIndex + 1);
            const prevIndex = Math.max(0, currentIndex - 1);

            return {
                nextIndex,
                prevIndex,
            };
        }

        const nextIndex = (
            currentIndex === listLength - 1
                ? 0
                : currentIndex + 1
        );
        const prevIndex = (
            currentIndex === 0
                ? listLength - 1
                : currentIndex - 1
        );

        return {
            nextIndex,
            prevIndex,
        };
    }

    private getInitialId() {
        const index = (
            this.options.takeInitialIdFrom === 'start'
                ? 0
                : -1
        );

        return this.options.initialFocusedId ?? this.options.list.at(index);
    }

    private notify(props: ListenerProps) {
        this.currentId = props.next.id;
        this.listeners.triggerAll(props);
    }
}