/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ReduxToolkit } from '@/libs';
import { StoreTypes } from '@/store/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { isPlainObject } from '@lesnoypudge/utils';



type EntityState<_State> = ReduxToolkit.EntityState<_State, string>;

type Builder<_State> = ReduxToolkit.ActionReducerMapBuilder<
    EntityState<_State>
>;

type ApiUnion = T.ValueOf<StoreTypes.Apis>;

export const createEntityExtraReducers = <
    _Api extends ApiUnion,
    _State,
>({
    addOne,
    api,
    builder,
}: {
    api: _Api;
    builder: Builder<_State>;
    addOne: (state: EntityState<_State>, payload: _State) => void;
}) => {
    const keys = Object.keys(api.endpoints);
    if (!keys.length) return;

    const matchers = keys.map((key) => {
        // @ts-expect-error
        const endpoint = api.endpoints[key];
        if (!endpoint) return;
        if (!('matchFulfilled' in endpoint)) return;

        return endpoint.matchFulfilled;
    }).filter(Boolean);


    builder.addMatcher(
        ReduxToolkit.isAnyOf(...matchers),

        (state, { payload }) => {
            if (!isPlainObject(payload)) return;
            if (!('id' in payload)) return;

            // assume that payload is of correct type
            // @ts-expect-error
            addOne(state, payload as _State);
        },
    );
};