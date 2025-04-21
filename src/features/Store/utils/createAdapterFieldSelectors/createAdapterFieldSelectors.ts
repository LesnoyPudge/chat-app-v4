import { createSelector } from '@/store/utils';
import { StoreTypes } from '@/store/types';
import { WithId } from '@/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { capitalize } from '@lesnoypudge/utils';



export type FieldSelectors<
    _State extends WithId,
    _Keys extends (keyof _State)[],
> = {
    [_Key in T.ArrayValues<_Keys> as (
        _Key extends string
            ? `select${Capitalize<_Key>}ById`
            : never
    )]: (
        (id: _State['id'] | undefined) => (
            rootState: StoreTypes.State
        ) => _State[_Key] | undefined
    );
};

export const createAdapterFieldSelectors = <
    _Slice extends T.ValueOf<StoreTypes.SlicesWithEntityAdapter>,
    _State extends StoreTypes.ExtractStateFromSliceWithEntityAdapter<_Slice>,
    _Keys extends (keyof _State)[],
    _SelectById extends (
        (id: string) => (
            (rootState: StoreTypes.State) => _State | undefined
        )
    ),
>({
    keys,
    selectById,
    slice,
}: {
    slice: _Slice;
    selectById: _SelectById;
    keys: _Keys;
}) => {
    const result = {} as FieldSelectors<_State, _Keys>;
    const sliceName = slice.name;

    for (const key of keys) {
        const selectorName = `select${capitalize(String(key))}ById`;
        const selectorDisplayName = `${sliceName}/${selectorName}`;

        const selector = createSelector.withParams((
            id: _State['id'] | undefined,
        ) => (query) => query(() => {
            if (!id) return;

            const entity = query(selectById(id));
            if (!entity) return;

            return entity[key];
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