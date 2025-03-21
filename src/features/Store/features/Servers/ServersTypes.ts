import { ReduxToolkit } from '@/libs';
import { ClientEntities } from '@/types';



export namespace ServersTypes {
    export type EntityState = ClientEntities.Server.Base;

    export type State = ReduxToolkit.EntityState<
        EntityState,
        EntityState['id']
    >;
}