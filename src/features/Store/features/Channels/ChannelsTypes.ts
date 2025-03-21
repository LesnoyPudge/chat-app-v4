import { ReduxToolkit } from '@/libs';
import { ClientEntities } from '@/types';



export namespace ChannelsTypes {
    export type EntityState = ClientEntities.Channel.Base;

    export type State = ReduxToolkit.EntityState<
        EntityState,
        EntityState['id']
    >;
}