import { autoBind, catchErrorAsync, invariant, ListenerStore, promiseRetry, promiseTimeout } from '@lesnoypudge/utils';
import { LoadingState } from '../vars';
import { secondsToMilliseconds } from 'date-fns';
import { logger } from '@/utils';



type ModuleFetchFn<_Value> = () => Promise<_Value>;

export class LazyModule<_Value> {
    private state: LoadingState;
    private value: _Value | undefined;
    private promise: Promise<_Value | undefined> | undefined;
    private fetchFn: ModuleFetchFn<_Value>;
    private name: string;
    private listeners: ListenerStore<null, [_Value]>;

    constructor(name: string, fetchFn: ModuleFetchFn<_Value>) {
        this.state = LoadingState.Uninitialized;
        this.value = undefined;
        this.fetchFn = fetchFn;
        this.name = name;
        this.listeners = new ListenerStore();

        autoBind(this);
    }

    onLoad(listener: ListenerStore.Callback<[_Value]>) {
        return this.listeners.add(null, listener);
    }

    async load() {
        const shouldBail = (
            this.state === LoadingState.Loading
            || this.state === LoadingState.Success
        );

        if (shouldBail) return this.promise;

        this.state = LoadingState.Loading;

        const promise = catchErrorAsync(() => {
            const TIMEOUT = secondsToMilliseconds(30);
            const ATTEMPTS = 3;

            return promiseRetry(() => promiseTimeout(
                this.fetchFn(),
                TIMEOUT,
            ), ATTEMPTS);
        });

        this.promise = promise.then(([v]) => v);

        const [value, error] = await promise;

        this.promise = undefined;

        if (!error) {
            this.value = value;
            this.state = LoadingState.Success;

            this.listeners.triggerAll(this.value);

            logger.lazyModules.log(`LazyModules: "${this.name}" ready`);

            return value;
        }

        logger.lazyModules.log(`LazyModules: "${this.name}" failed`);

        this.state = LoadingState.Error;

        throw new Error(`Failed to load lazy module: ${this.name}`);
    }

    getLoadedValue() {
        invariant(
            this.state === LoadingState.Success,
            'Trying to access loaded value before it being loaded',
        );

        return this.value as _Value;
    }

    getIsLoaded() {
        return this.state === LoadingState.Success;
    }

    getValue() {
        return this.value;
    }
}