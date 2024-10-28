import { C, T } from '@root';


export type SocketAuth = T.Simplify<Pick<T.Tokens, 'accessToken'>>;

type SubscribableEntities = typeof C.SUBSCRIBABLE_ENTITY_NAMES;

type ToName<
    _EntityName extends string,
    _EventName extends string,
> = `${_EntityName}_${_EventName}`;

export type SocketClientEvents = Record<
    ToName<
        T.ValueOf<SubscribableEntities>,
        T.ValueOf<typeof C.SOCKET_CLIENT_EVENT_NAMES>
    >,
    (entityId: string) => void
>;

export type SocketServerEvents = T.Simplify<
    Record<
        ToName<
            T.ValueOf<SubscribableEntities>,
            typeof C.SOCKET_SERVER_EVENT_NAMES.DELETE |
            typeof C.SOCKET_SERVER_EVENT_NAMES.ERROR
        >,
        (entityId: string) => void
    > & Record<
        ToName<
            SubscribableEntities['CHANNEL'],
            typeof C.SOCKET_SERVER_EVENT_NAMES.DATA
        >,
        (entityId: string, data: T.Entities.Channel.Default) => void
    > & Record<
        ToName<
            SubscribableEntities['CHAT'],
            typeof C.SOCKET_SERVER_EVENT_NAMES.DATA
        >,
        (entityId: string, data: T.Entities.Chat.Default) => void
    > & Record<
        ToName<
            SubscribableEntities['MESSAGE'],
            typeof C.SOCKET_SERVER_EVENT_NAMES.DATA
        >,
        (entityId: string, data: T.Entities.Message.Default) => void
    > & Record<
        ToName<
            SubscribableEntities['PRIVATE_CHANNEL'],
            typeof C.SOCKET_SERVER_EVENT_NAMES.DATA
        >,
        (entityId: string, data: T.Entities.PrivateChannel.Default) => void
    > & Record<
        ToName<
            SubscribableEntities['ROLE'],
            typeof C.SOCKET_SERVER_EVENT_NAMES.DATA
        >,
        (entityId: string, data: T.Entities.Role.Default) => void
    > & Record<
        ToName<
            SubscribableEntities['ROOM'],
            typeof C.SOCKET_SERVER_EVENT_NAMES.DATA
        >,
        (entityId: string, data: T.Entities.Room.Default) => void
    > & Record<
        ToName<
            SubscribableEntities['USER'],
            typeof C.SOCKET_SERVER_EVENT_NAMES.DATA
        >,
        (
            entityId: string,
            data: (
                T.Entities.User.WithoutCredentials
                | (T.Entities.User.Public & T.Entities.User.WithStatus)
            )
        ) => void
    >
>;