import { RootState } from '@redux/store';



// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Selector = (state: RootState, props: any) => any;

type ModifiedSelectors<_Selectors extends Record<string, Selector>> = {
    [_Key in keyof _Selectors]: (
        (props: (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Parameters<_Selectors[_Key]> extends [any, infer _Props]
                ? _Props
                : void
        )) => (
            (state: Parameters<_Selectors[_Key]>[0]) => (
                ReturnType<_Selectors[_Key]>
            )
        )
    )
};

type Return<_Selectors extends Record<string, Selector>> = {
    StoreSelectors: ModifiedSelectors<_Selectors>;
};

export const createStoreSelectors = <
    _Selectors extends Record<string, Selector>,
>(selectors: _Selectors): Return<_Selectors> => {
    const modifiedSelectors = (
        Object.keys(selectors)
            .reduce<ModifiedSelectors<_Selectors>>((acc, cur) => {
                // @ts-expect-error
                acc[cur] = (...props) => (state) => {
                    // @ts-expect-error
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return
                    return selectors[cur](state, ...props);
                };
                return acc;
            }, {})
    );

    return {
        StoreSelectors: modifiedSelectors,
    };
};