import { RootState } from '@/redux/store';
import { toCurriedSelectors } from '../toCurriedSelectors';



// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Selector = (state: RootState, props: any) => any;

type Return<_Selectors extends Record<string, Selector>> = {
    StoreSelectors: toCurriedSelectors.CurriedSelectors<_Selectors>;
};

export const createStoreSelectors = <
    _Selectors extends Record<string, Selector>,
>(selectors: _Selectors): Return<_Selectors> => {
    const curriedSelectors = toCurriedSelectors(selectors);

    return {
        StoreSelectors: curriedSelectors,
    };
};