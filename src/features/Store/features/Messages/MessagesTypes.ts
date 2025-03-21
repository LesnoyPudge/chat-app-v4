import { ReduxToolkit } from '@/libs';
import { ClientEntities } from '@/types';



export namespace MessagesTypes {
    export type EntityState = ClientEntities.Message.Base;

    export type State = ReduxToolkit.EntityState<
        EntityState,
        EntityState['id']
    >;
}