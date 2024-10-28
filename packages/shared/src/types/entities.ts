import { C, T } from '@root';



export namespace Entities {
    export namespace User {
        export type Id = T.Tagged<string, 'UserId'>;

        export type Credentials = {
            password: string;
            refreshToken: string;
            accessCode: {
                code: string;
                expiresAt: number;
            };
        };

        type WithCredentials = {
            credentials: Credentials;
        };

        export type Theme = 'auto' | 'dark' | 'light';

        export type FontSize = 12 | 14 | 16 | 18 | 20;

        export type MessageGroutSpacing = 16 | 20;

        export type MessageDisplayType = 'cozy' | 'compact';

        export type Settings = {
            theme: Theme;
            fontSize: FontSize;
            messageGroupSpacing: MessageGroutSpacing;
            messageDisplayType: MessageDisplayType;
        };

        type WithSettings = {
            settings: Settings;
        };

        export type Status = 'online' | 'offline';

        export type ExtraStatus = 'default' | 'afk' | 'dnd' | 'invisible';

        export type WithStatus = {
            status: Status;
            extraStatus: ExtraStatus;
        };

        export type Default = (
            WithCredentials
            & WithSettings
            & WithStatus
            & {
                id: Id;
                login: string;
                username: string;
                avatar: string;
                email: string | null;
                extraStatus: ExtraStatus;
                isActivated: boolean;
                friends: Id[];
                blocked: Id[];
                channels: Entities.Channel.Id[];
                privateChannels: {
                    id: Entities.PrivateChannel.Id;
                    hidden: boolean;
                }[];
                friendRequests: {
                    incoming: {
                        from: Id;
                        createdAt: number;
                    }[];
                    outgoing: {
                        to: Id;
                        createdAt: number;
                    }[];
                };
                isDeleted: boolean;
                createdAt: number;
            }
        );

        export type WithoutCredentials = T.Simplify<Omit<
            Default,
            keyof WithCredentials
        >>;

        export type Public = Pick<
            Default,
            'id' | 'avatar' | 'login' | 'extraStatus' |
            'username' | 'isDeleted' | 'status'
        >;

        // export type Token = Pick<
        //     Default,
        //     'id' | 'credentials'
        // >;
    }

    export namespace Channel {
        export type Id = T.Tagged<string, 'ChannelId'>;

        export type Default = {
            id: Id;
            identifier: string;
            avatar: string | null;
            name: string;
            owner: Entities.User.Id;
            isPrivate: boolean;
            members: Entities.User.Id[];
            rooms: Entities.Room.Id[];
            roles: Entities.Role.Id[];
            banned: {
                user: Entities.User.Id;
                reason: string;
            }[];
            invitations: {
                creator: Entities.User.Id;
                code: string;
                expiresAt: number | null;
                createdAt: number;
            }[];
            createdAt: number;
        };
    }

    export namespace Room {
        export type Id = T.Tagged<string, 'RoomId'>;

        type WithTextChat = {
            chat: Entities.Chat.Id;
            voiceChat: never;
        };

        type WithVoiceChat = {
            chat: never;
            voiceChat: Entities.VoiceChat.Id;
        };

        export type Default = T.Simplify<(WithTextChat | WithVoiceChat) & {
            id: Id;
            name: string;
            channel: Entities.Channel.Id;
            isPrivate: boolean;
            whiteList: {
                users: Entities.User.Id[];
                roles: Entities.Role.Id[];
            };
            type: 'voice' | 'text';
            createdAt: number;
        }>;
    }

    export namespace Message {
        export type Id = T.Tagged<string, 'MessageId'>;

        export type Default = {
            id: Id;
            chat: Entities.Chat.Id;
            user: Entities.User.Id;
            content: string;
            attachments: Entities.File.Attachment[];
            reactions: Entities.Reactions.Id;
            isChanged: boolean;
            isDeleted: boolean;
            createdAt: number;
            updatedAt: number;
        };
    }

    export namespace Reactions {
        export type Id = T.Tagged<string, 'RoleId'>;

        export type Default = {
            id: Id;
            message: Entities.Message.Id;
            counters: {
                code: T.EmojiCode;
                users: Entities.User.Id[];
            }[];
        };
    }

    export namespace Role {
        export type Id = T.Tagged<string, 'RoleId'>;

        export type Default = {
            id: Id;
            name: string;
            channel: Entities.Channel.Id;
            users: Entities.User.Id[];
            isDefault: boolean;
            color: string;
            image: string | null;
            order: number;
            permissions: {
                channelControl: boolean;
                roomControl: boolean;
                createInvitation: boolean;
                kickMember: boolean;
                banMember: boolean;
                isAdministrator: boolean;
            };
            createdAt: number;
        };
    }

    export namespace File {
        export type Id = T.Tagged<string, 'FileId'>;

        export type Default = {
            id: Id;
            name: string;
            size: number;
            type: string;
            base64: string;
            isDeletable: boolean;
            createdAt: number;
        };

        export type Encoded = Pick<
            File.Default,
            'name' | 'size' | 'type' | 'base64'
        >;

        export type Attachment = Pick<
            File.Default,
            'id' | 'name' | 'type' | 'size'
        >;
    }

    export namespace PrivateChannel {
        export type Id = T.Tagged<string, 'PrivateChannelId'>;

        type WithTextChat = {
            chat: Entities.Chat.Id;
            voiceChat: never;
        };

        type WithVoiceChat = {
            chat: never;
            voiceChat: Entities.VoiceChat.Id;
        };

        export type Default = (WithTextChat | WithVoiceChat) & {
            id: Id;
            members: [Entities.User.Id, Entities.User.Id];
            createdAt: number;
        };
    }

    export namespace Chat {
        export type Id = T.Tagged<string, 'ChatId'>;

        type WithRoomOwner = {
            ownerType: typeof C.MODEL_NAMES.ROOM;
            ownerId: Entities.Room.Id;
        };

        type WithPrivateChannelOwner = {
            ownerType: typeof C.MODEL_NAMES.PRIVATE_CHANNEL;
            ownerId: Entities.PrivateChannel.Id;
        };

        export type Default = (WithRoomOwner | WithPrivateChannelOwner) & {
            id: Id;
            messages: Entities.Message.Id[];
        };
    }

    export namespace VoiceChat {
        export type Id = T.Tagged<string, 'VoiceChatId'>;

        type WithRoomOwner = {
            ownerType: typeof C.MODEL_NAMES.ROOM;
            ownerId: Entities.Room.Id;
        };

        type WithPrivateChannelOwner = {
            ownerType: typeof C.MODEL_NAMES.PRIVATE_CHANNEL;
            ownerId: Entities.PrivateChannel.Id;
        };

        type PeerId = string;

        export type Default = (WithPrivateChannelOwner & WithRoomOwner) & {
            id: Id;
            members: Map<Entities.User.Id, PeerId>;
        };
    }
}