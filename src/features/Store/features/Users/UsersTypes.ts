import { ReduxToolkit } from '@/libs';
import { ClientEntities } from '@/types';



export namespace UsersTypes {
    export type EntityState = ClientEntities.User.Base;

    export type State = ReduxToolkit.EntityState<
        EntityState,
        EntityState['id']
    >;
}