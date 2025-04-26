import { autoBind, catchErrorAsync, ListenerStore, noop } from '@lesnoypudge/utils';
import { modules } from './modules';
import { LoadingState } from './vars';



export namespace LazyModules {
    export type Modules = typeof modules;

    export type ModuleNames = keyof Modules;
}

export class LazyModules {
    private state: LoadingState;
    private listeners: ListenerStore<null, [boolean]>;
    private modules: LazyModules.Modules;
    private promise: Promise<void> | undefined;

    constructor() {
        this.state = LoadingState.Uninitialized;
        this.listeners = new ListenerStore();
        this.modules = modules;

        autoBind(this);
    }

    onUpdate(listener: ListenerStore.Callback<[boolean]>) {
        return this.listeners.add(null, listener);
    }

    getIsLoaded() {
        return this.state === LoadingState.Success;
    }

    getModules() {
        return this.modules;
    }

    async startLoading() {
        const shouldBail = (
            this.state === LoadingState.Loading
            || this.state === LoadingState.Success
        );
        if (shouldBail) return this.promise;

        this.state = LoadingState.Loading;

        this.listeners.triggerAll(false);

        const promises = Object.values(this.modules).map((module) => {
            return module.load();
        });

        const promise = catchErrorAsync(() => Promise.all(promises));

        this.promise = promise.then(noop);

        const [_, error] = await promise;

        this.promise = undefined;

        if (error) {
            this.state = LoadingState.Error;
            this.listeners.triggerAll(false);

            throw new Error('Failed to load lazy modules');
        }

        this.state = LoadingState.Success;
        this.listeners.triggerAll(true);
    }
}