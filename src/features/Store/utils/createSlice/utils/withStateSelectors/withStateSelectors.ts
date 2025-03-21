import { ReduxToolkit } from '@/libs';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { capitalize } from '@lesnoypudge/utils';



type Selectors<
    _State extends T.UnknownRecord,
> = T.UnionToIntersection<{

    [_Key in keyof _State]: _Key extends string
        ? Record<
            `select${Capitalize<_Key>}`,
            (state: _State) => _State[_Key]
        >
        : never
}[keyof _State]>;

type Options<
    _State extends T.UnknownRecord,
    _Selectors extends ReduxToolkit.SliceSelectors<_State>,
> = {
    initialState: _State;
    selectors: _Selectors;
};

export const withStateSelectors = <
    _State extends T.UnknownRecord,
    _Selectors extends ReduxToolkit.SliceSelectors<_State>,
>({
    initialState,
    selectors,
}: Options<_State, _Selectors>) => {
    const stateSelectors = {} as Selectors<_State>;

    for (const key of Object.keys(initialState)) {
        const name = `select${capitalize(key)}`;

        const selector = (state: _State) => {
            return state[key];
        };

        Object.assign(stateSelectors, {
            [name]: selector,
        });
    }

    return {
        ...stateSelectors,
        ...selectors,
    };
};