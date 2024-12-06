import { useDispatch } from 'react-redux';
import { Slices, type AppDispatch } from '@redux/store';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useConst } from '@lesnoypudge/utils-react';



const useTypedDispatch = useDispatch.withTypes<AppDispatch>();

type SliceMethods<
    _Slice extends T.ValueOf<Slices>,
> = {
    [_Key in keyof _Slice['actions']]: (
        payload: _Slice['actions'][_Key] extends ActionCreatorWithPayload<
            infer _Payload
        >
            ? _Payload extends void
                ? void
                : _Payload
            : never,
    ) => void;
};

export const useSliceActions = <
    _Slice extends T.ValueOf<Slices>,
>(slice: _Slice) => {
    const dispatch = useTypedDispatch();

    const methods = useConst(() => (
        Object.keys(slice.actions)
            .reduce<SliceMethods<_Slice>>((acc, cur) => {
                // @ts-expect-error
                acc[cur] = (payload) => {
                    // @ts-expect-error
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                    const action = slice.actions[cur](payload);
                    dispatch(action);
                };
                return acc;
            }, {})
    ));

    return methods;
};