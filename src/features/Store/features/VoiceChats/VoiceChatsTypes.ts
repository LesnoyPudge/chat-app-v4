import { ReduxToolkit } from '@/libs';
import { ClientEntities } from '@/types';



export namespace VoiceChatsTypes {
    export type EntityState = ClientEntities.VoiceChat.Base;

    export type State = ReduxToolkit.EntityState<
        EntityState,
        EntityState['id']
    >;
}