import { StoreTypes } from '@/store/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';



export namespace toCurriedSelector {
    export type Return<
        _Selector extends T.AnyFunction,
    > = (...args: (
        T.IsEqual<Parameters<_Selector>['length'], 1> extends true
            ? void[]
            : Parameters<_Selector> extends [
                unknown,
                ...infer _Rest extends unknown[],
            ]
                ? _Rest
                : never
    )) => (rootState: StoreTypes.State) => ReturnType<_Selector>;
}

export const toCurriedSelector = <
    _Selector extends T.AnyFunction,
    _State,
>(
    getState: (rootState: StoreTypes.State) => _State,
    selector: _Selector,
): toCurriedSelector.Return<_Selector> => {
    return (...args) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return (rootState) => selector(getState(rootState), ...args);
    };
};