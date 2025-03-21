import { ReduxToolkit } from '@/libs';
import { ClientEntities } from '@/types';



export namespace RolesTypes {
    export type EntityState = ClientEntities.Role.Base;

    export type State = ReduxToolkit.EntityState<
        EntityState,
        EntityState['id']
    >;
}