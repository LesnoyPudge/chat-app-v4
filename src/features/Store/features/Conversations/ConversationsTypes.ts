import { ReduxToolkit } from '@/libs';
import { ClientEntities } from '@/types';



export namespace ConversationsTypes {
    export type EntityState = ClientEntities.Conversation.Base;

    export type State = ReduxToolkit.EntityState<
        EntityState,
        EntityState['id']
    >;
}