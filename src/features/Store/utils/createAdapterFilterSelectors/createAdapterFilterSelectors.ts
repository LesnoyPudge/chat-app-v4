import { createSelector } from '@/store/utils';
import { StoreTypes } from '@/store/types';
import { WithId } from '@/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { capitalize } from '@lesnoypudge/utils';



export type FilterSelectors<
    _State extends WithId,
    _Keys extends (keyof _State)[],
> = {
    [_Key in T.ArrayValues<_Keys> as (
        _Key extends string
            ? `selectFilteredBy${Capitalize<_Key>}`
            : never
    )]: (
        (searchValue: _State[_Key] | undefined) => (
            rootState: StoreTypes.State
        ) => _State[]
    );
};

export const createAdapterFilterSelectors = <
    _Slice extends T.ValueOf<StoreTypes.SlicesWithEntityAdapter>,
    _State extends StoreTypes.ExtractStateFromSliceWithEntityAdapter<_Slice>,
    _Keys extends (keyof _State)[],
    _SelectAll extends (rootState: StoreTypes.State) => _State[],
>({
    keys,
    selectAll,
    slice,
}: {
    slice: _Slice;
    selectAll: _SelectAll;
    keys: _Keys;
}) => {
    const result = {} as FilterSelectors<_State, _Keys>;
    const sliceName = slice.name;

    for (const key of keys) {
        const selectorName = `selectFilteredBy${capitalize(String(key))}`;
        const selectorDisplayName = `${sliceName}/${selectorName}`;

        const selector = createSelector.withParams((
            searchValue: _State[typeof key] | undefined,
        ) => (query) => query(() => {
            const allEntities = query(selectAll);

            return allEntities.filter((item) => {
                return item[key] === searchValue;
            });
        }), selectorDisplayName);

        Object.assign(
            result,
            {
                [selectorName]: selector,
            },
        );
    }

    return result;
};