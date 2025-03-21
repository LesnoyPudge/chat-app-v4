import { StoreTypes } from '@/store/types';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useConst } from '@lesnoypudge/utils-react';
import { invariant, isCallable } from '@lesnoypudge/utils';
import { ReduxReact, ReduxToolkit } from '@/libs';



const useTypedDispatch = ReduxReact.useDispatch.withTypes<
    StoreTypes.Dispatch
>();

type SliceMethods<
    _Slice extends T.ValueOf<StoreTypes.Slices>,
> = {
    [_Key in keyof _Slice['actions']]: (
        payload: (
            _Slice['actions'][_Key]
        ) extends ReduxToolkit.ActionCreatorWithPayload<
            infer _Payload
        >
            ? _Payload extends void
                ? void
                : _Payload
            : never,
    ) => void;
};

type StoreWithSliceHolders = {
    [_SliceName in keyof StoreTypes.Slices]: {
        _Slice: StoreTypes.Slices[_SliceName];
    }
};

export const useActions = <
    _SliceHolder extends T.ValueOf<StoreWithSliceHolders>,
    _Slice extends _SliceHolder['_Slice'],
>(sliceHolder: _SliceHolder) => {
    const dispatch = useTypedDispatch();

    const methods = useConst(() => {
        const slice = sliceHolder._Slice;
        const result = {} as SliceMethods<_Slice>;

        for (const [actionName, action] of Object.entries(slice.actions)) {
            invariant(isCallable(action));

            const actionWithDispatcher = (
                payload: Parameters<typeof action>[0],
            ) => {
                dispatch(action(payload));
            };

            Object.assign(
                result,
                {
                    [actionName]: actionWithDispatcher,
                },
            );
        }

        return result;
    });

    return methods;
};