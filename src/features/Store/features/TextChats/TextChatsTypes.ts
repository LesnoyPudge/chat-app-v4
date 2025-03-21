import { ReduxToolkit } from '@/libs';
import { ClientEntities } from '@/types';



export namespace TextChatsTypes {
    export type EntityState = ClientEntities.TextChat.Base;

    export type State = ReduxToolkit.EntityState<
        EntityState,
        EntityState['id']
    >;
}