import type * as slices from '@/store/features';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { WithId } from '@/types';
import { ReduxToolkit } from '@/libs';



export namespace StoreTypes {
    export type State = {
        App: slices.App.Types.State;
        Channels: slices.Channels.Types.State;
        Conversations: slices.Conversations.Types.State;
        Messages: slices.Messages.Types.State;
        Roles: slices.Roles.Types.State;
        Servers: slices.Servers.Types.State;
        TextChats: slices.TextChats.Types.State;
        Users: slices.Users.Types.State;
        VoiceChats: slices.VoiceChats.Types.State;
    };

    export type Slices = {
        App: typeof slices.App._Slice;
        Channels: typeof slices.Channels._Slice;
        Conversations: typeof slices.Conversations._Slice;
        Messages: typeof slices.Messages._Slice;
        Roles: typeof slices.Roles._Slice;
        Servers: typeof slices.Servers._Slice;
        TextChats: typeof slices.TextChats._Slice;
        Users: typeof slices.Users._Slice;
        VoiceChats: typeof slices.VoiceChats._Slice;
    };

    export type Apis = {
        Channels: typeof slices.Channels.Api;
        Conversations: typeof slices.Conversations.Api;
        Messages: typeof slices.Messages.Api;
        Roles: typeof slices.Roles.Api;
        Servers: typeof slices.Servers.Api;
        TextChats: typeof slices.TextChats.Api;
        Users: typeof slices.Users.Api;
        VoiceChats: typeof slices.VoiceChats.Api;
    };

    export type SlicesWithEntityAdapter = T.Except<Slices, 'App'>;

    export type Store = ReturnType<typeof ReduxToolkit.configureStore<State>>;

    export type Dispatch = Store['dispatch'];

    export type Thunk<ThunkReturnType = void> = ReduxToolkit.ThunkAction<
        ThunkReturnType,
        State,
        unknown,
        ReduxToolkit.Action
    >;

    export type ExtractStateFromSliceWithEntityAdapter<
        _Slice extends T.ValueOf<StoreTypes.SlicesWithEntityAdapter>,
    > = (
        ReturnType<_Slice['getInitialState']> extends ReduxToolkit.EntityState<
            infer _State extends WithId,
            WithId['id']
        >
            ? _State
            : never
    );
}