import { T } from '@lesnoypudge/types-utils-base/namespace';



export namespace toCurriedSelectors {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export type AnySelector = (state: any, props: any) => any;

    export type GenericSelectors<
        _Selector extends AnySelector = AnySelector,
    > = Record<string, _Selector>;

    export type CurriedSelectors<
        _Selectors extends GenericSelectors,
    > = {
        [_Key in keyof _Selectors]: (props: (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Parameters<_Selectors[_Key]> extends [any, infer _Props]
                ? _Props
                : void
        )) => {
            (state: Parameters<_Selectors[_Key]>[0]): (
                ReturnType<_Selectors[_Key]>
            );
            selectorName: string;
        }
    };
}

export const toCurriedSelectors = <
    _Selectors extends toCurriedSelectors.GenericSelectors,
>(
    selectors: _Selectors,
): T.Simplify<toCurriedSelectors.CurriedSelectors<_Selectors>> => {
    const result = {} as toCurriedSelectors.CurriedSelectors<_Selectors>;

    for (const key of Object.keys<_Selectors>(selectors)) {
        const selector = selectors[key];
        if (!selector) continue;

        result[key] = (props) => {
            const innerSelector = (
                state: Parameters<_Selectors[T.StringKeyOf<_Selectors>]>[0],
            ) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return selector(state, props);
            };

            innerSelector.selectorName = key;

            return innerSelector;
        };
    }

    return result;
};