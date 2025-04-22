import { autoBind, invariant, ListenerStore, shallowEqual } from '@lesnoypudge/utils';
import { Types } from '../../types';



export class KeyboardNavigationInstance {
    private currentId: string | undefined;
    private currentIndex: number;
    private options: Types.Instance.Options;
    private listeners: ListenerStore<null, [Types.Instance.ListenerProps]>;

    constructor(props: Types.Instance.ConstructorProps) {
        this.options = this.withDefaultProps(props);
        this.listeners = new ListenerStore();

        const item = (
            this.validateId(this.getInitialId(), this.options.list)
            ?? this.getEmptyItem()
        );

        this.currentId = item.id;
        this.currentIndex = item.index;

        autoBind(this);
    }

    getId() {
        return this.currentId;
    }

    setId(newId: string) {
        const newItem = this.validateId(newId, this.options.list);

        if (!newItem) return;

        const prevItem = this.getCurrentItemOrUndefined();

        this.setCurrentItem(newItem);
        this.notify({
            isFromEvent: false,
            moveDirection: undefined,
            next: newItem,
            prev: prevItem,
        });
    }

    eventMove(props: Pick<Types.Instance.ListenerProps, 'moveDirection'>) {
        if (!this.options.list.length) return;

        const isForward = props.moveDirection === 'forward';
        const notLoop = !this.options.loop;
        const isAtEdge = (
            isForward
                ? this.currentIndex === this.options.list.length - 1
                : this.currentIndex === 0
        );

        const shouldSkip = notLoop && isAtEdge;
        if (shouldSkip) return;

        const { nextIndex, prevIndex } = this.getPossibleIndexes();

        const newIndex = isForward ? nextIndex : prevIndex;
        const newId = this.options.list[newIndex];
        invariant(newId);

        const prevItem = this.getCurrentItemOrUndefined();
        const newItem = {
            id: newId,
            index: newIndex,
        };

        this.setCurrentItem(newItem);
        this.notify({
            isFromEvent: true,
            moveDirection: props.moveDirection,
            prev: prevItem,
            next: newItem,
        });
    }

    updateOptions(newOptions: Types.Instance.UpdatableOptions) {
        const options = this.options;
        const mergedOptions: Types.Instance.Options = {
            list: (
                newOptions.list ?? options.list
            ),
            loop: (
                newOptions.loop ?? options.loop
            ),
            takeInitialIdFrom: (
                newOptions.takeInitialIdFrom ?? options.takeInitialIdFrom
            ),
        };

        if (shallowEqual(mergedOptions, options)) return;

        const derivedItem = this.deriveNewItem(mergedOptions);

        Object.assign(this.options, mergedOptions);

        if (
            (derivedItem.id === this.currentId)
            && (derivedItem.index === this.currentIndex)
        ) return;

        const prevItem = this.getCurrentItemOrUndefined();

        this.setCurrentItem(derivedItem);
        this.notify({
            isFromEvent: false,
            moveDirection: undefined,
            next: derivedItem,
            prev: prevItem,
        });
    }

    onIdChange(listener: Types.Instance.OnIdChangeListener) {
        return this.listeners.add(null, listener);
    }

    private withDefaultProps({
        list = [],
        loop = false,
        takeInitialIdFrom = 'start',
    }: Partial<Types.Instance.ConstructorProps>) {
        return {
            list,
            loop,
            takeInitialIdFrom,
        };
    }

    private getEmptyItem(): Types.Instance.EmptyItem {
        return {
            id: undefined,
            index: -1,
        };
    }

    private getCurrentItem(): Types.Instance.MaybeEmptyItem {
        if (!this.currentId) return this.getEmptyItem();

        return {
            id: this.currentId,
            index: this.currentIndex,
        };
    }

    private getCurrentItemOrUndefined(): Types.Instance.Item | undefined {
        const item = this.getCurrentItem();
        if (!item.id) return;

        return item;
    }

    private validateId(
        id: string | undefined,
        list: string[],
    ): Types.Instance.Item | undefined {
        if (!id) return;

        const index = list.indexOf(id);

        if (index === -1) return;

        return {
            id,
            index,
        };
    }

    private deriveNewItem(
        options: Types.Instance.UpdatableOptions,
    ): Types.Instance.MaybeEmptyItem {
        // we care only about options.list since it is the only option
        // that can invalidate current id.

        // it is either new list or old list
        const newList = options.list;
        invariant(newList);

        const isSameList = newList === this.options.list;
        if (isSameList) this.getCurrentItem();

        const isListEmpty = newList.length === 0;
        if (isListEmpty) return this.getEmptyItem();
        // list not empty

        const currentItemInNewList = this.validateId(this.currentId, newList);
        if (currentItemInNewList) return currentItemInNewList;
        // list not empty but current id is invalid

        const newIndex = (
            this.currentIndex === -1
                ? this.getInitialIndex(newList)
                : Math.min(newList.length - 1, this.currentIndex)
        );

        const newId = newList[newIndex];
        invariant(newId);

        return {
            id: newId,
            index: newIndex,
        };
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

    private getInitialIndex(list: string[]) {
        const index = (
            this.options.takeInitialIdFrom === 'start'
                ? 0
                : list.length - 1
        );

        return index;
    }

    getInitialId() {
        return this.options.list.at(
            this.getInitialIndex(this.options.list),
        );
    }

    private notify(props: Types.Instance.ListenerProps) {
        this.listeners.triggerAll(props);
    }

    private setCurrentItem(item: Types.Instance.MaybeEmptyItem) {
        this.currentId = item.id;
        this.currentIndex = item.index;
    }
}