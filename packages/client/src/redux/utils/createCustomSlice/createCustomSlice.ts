import { T } from '@lesnoypudge/types-utils-base/namespace';
import {
    asyncThunkCreator,
    buildCreateSlice,
    createListenerMiddleware,
    CreateSliceOptions,
    SliceCaseReducers,
    SliceSelectors,
} from '@reduxjs/toolkit';
import {
    withConfigReducers,
    withConfigSelectors,
    withSliceSelectors,
} from '../enhancers';



export const createCustomSlice = <
    _State extends T.UnknownRecord,
    _CaseReducers extends SliceCaseReducers<_State>,
    _Name extends string,
    _Selectors extends SliceSelectors<_State>,
>(
    config: T.Except<CreateSliceOptions<
        _State,
        _CaseReducers,
        _Name,
        _Name,
        _Selectors
    >, 'reducerPath'> & {
        listenerMiddlewares?: ((
            props: ReturnType<typeof createListenerMiddleware>
        ) => void)[];
    },
) => {
    const enhancedConfig = (
        withConfigSelectors(
            withConfigReducers(
                config,
            ),
        )
    );

    const slice = (
        withSliceSelectors(
            buildCreateSlice({
                creators: { asyncThunk: asyncThunkCreator },
            })(enhancedConfig),
        )
    );

    return slice;
};