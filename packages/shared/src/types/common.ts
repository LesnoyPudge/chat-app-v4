import { T } from '@root';



export type Tokens = {
    refreshToken: string;
    accessToken: string;
};

export type WithUserId = {
    userId: T.Entities.User.Id;
};

export type WithTargetId = {
    targetId: T.Entities.User.Id;
};

export type WithChannelId = {
    channelId: T.Entities.Channel.Id;
};

export type WithRoomId = {
    roomId: T.Entities.Room.Id;
};

export type WithRoleId = {
    roleId: T.Entities.Role.Id;
};

export type WithPrivateChannelId = {
    privateChannelId: T.Entities.PrivateChannel.Id;
};

export type WithChatId = {
    chatId: T.Entities.Chat.Id;
};

export type WithMessageId = {
    messageId: T.Entities.Message.Id;
};

export type WithFileId = {
    fileId: T.Entities.File.Id;
};

export type UserWithTokens<
    User extends Partial<T.Entities.User.Default>,
> = Tokens & {
    user: User;
};

// export type WithId = {
//     id: Id;
// };

// export type SocketId = Id;

// export type UserId = Id;

// export type EntityId = Id;

// export type PeerId = Id;



// export type PartialWithId<T> = WithId & Partial<T>;