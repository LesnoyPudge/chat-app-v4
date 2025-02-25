import { T } from '@lesnoypudge/types-utils-base/namespace';



export namespace ClientEntities {
    export namespace User {
        export type Id = string;

        export type DefaultAvatar = 1 | 2 | 3 | 4;

        export type Settings = {
            theme: 'auto' | 'dark' | 'light';
            messageFontSize: 12 | 14 | 16 | 18 | 20;
            messageGroupSpacing: 16 | 20;
            messageDisplayMode: 'cozy' | 'compact';
        };

        export type Status = 'online' | 'offline';

        export type ExtraStatus = 'default' | 'afk' | 'dnd' | 'invisible';

        export type LastSeenMessage = {
            textChatId: TextChat.Id;
            lastIndex: number;
        };

        export type IncomingFriendRequest = {
            from: Id;
            createdAt: number;
        };

        export type OutgoingFriendRequest = {
            to: Id;
            createdAt: number;
        };

        export type Base = {
            id: Id;
            login: string;
            password: string;
            name: string;
            defaultAvatar: DefaultAvatar;
            avatar: File.Id | null;
            settings: Settings;
            status: Status;
            extraStatus: ExtraStatus;
            accessCode: string;
            friends: Id[];
            blocked: Id[];
            servers: Server.Id[];
            mutedServers: Server.Id[];
            conversations: Conversation.Id[];
            mutedConversations: Conversation.Id[];
            hiddenConversations: Conversation.Id[];
            incomingFriendRequests: IncomingFriendRequest[];
            outgoingFriendRequests: OutgoingFriendRequest[];
            lastSeenMessages: LastSeenMessage[];
            isDeleted: boolean;
            refreshToken: string;
            accessToken: string;
        };

        export type TokenData = Pick<Base, 'id' | 'password'>;
    }

    export namespace Message {
        export type Id = string;

        type Conditional = {
            channel: Channel.Id;
            server: Server.Id;
            conversation: null;
        } | {
            channel: null;
            server: null;
            conversation: Conversation.Id;
        };

        export type Base = T.Simplify<(
            Conditional
            & {
                id: Id;
                textChat: TextChat.Id;
                index: number;
                author: User.Id;
                content: string;
                isModified: boolean;
                isDeleted: boolean;
                attachments: File.Id[];
                createdAt: number;
                updatedAt: number;
            }
        )>;
    }

    export namespace TextChat {
        export type Id = string;

        export type Conditional = (
            {
                channel: Channel.Id;
                server: Server.Id;
                conversation: null;
            }
            | {
                channel: null;
                server: null;
                conversation: Conversation.Id;
            }
        );

        export type Base = T.Simplify<
            Conditional
            & {
                id: Id;
                messageCount: number;
                messages: Message.Id[];
            }
        >;
    }

    export namespace VoiceChat {
        export type Id = string;

        type Conditional = (
            {
                channel: Channel.Id;
                server: Server.Id;
                conversation: null;
            }
            | {
                channel: null;
                server: null;
                conversation: Conversation.Id;
            }
        );

        export type Base = T.Simplify<
            Conditional
            & {
                id: Id;
                participants: User.Id[];
                muted: User.Id[];
                deafen: User.Id[];
            }
        >;
    }

    export namespace Conversation {
        export type Id = string;

        export type Base = {
            id: Id;
            members: User.Id[];
            textChat: TextChat.Id;
            voiceChat: VoiceChat.Id;
        };
    }

    export namespace Role {
        export type Id = string;

        export type Permissions = {
            serverControl: boolean;
            channelControl: boolean;
            createInvitation: boolean;
            kickMember: boolean;
            banMember: boolean;
            admin: boolean;
        };

        export type Base = {
            id: Id;
            server: Server.Id;
            avatar: File.Id | null;
            name: string;
            color: string | null;
            isDefault: boolean;
            weight: number;
            users: User.Id[];
            permissions: Permissions;
        };
    }

    export namespace Channel {
        export type Id = string;

        type Conditional = (
            {
                textChat: TextChat.Id;
                voiceChat: null;
            }
            | {
                textChat: null;
                voiceChat: VoiceChat.Id;
            }
        );

        export type Base = T.Simplify<(
            Conditional
            & {
                id: Id;
                name: string;
                server: Server.Id;
                roleWhitelist: Role.Id[];
            }
        )>;
    }

    export namespace Server {
        export type Id = string;

        export type Base = {
            id: Id;
            owner: User.Id;
            roles: Role.Id[];
            channels: Channel.Id[];
            members: User.Id[];
            onlineMemberCount: number;
            avatar: File.Id | null;
            identifier: string;
            name: string;
            isPrivate: boolean;
            banned: User.Id[];
            invitations: {
                creator: User.Id;
                code: string;
                expiresAt: number | null;
                createdAt: number;
            }[];
        };
    }

    export namespace File {
        export type Id = string;

        export type Base = {
            id: Id;
            name: string;
            size: number;
            type: string;
            base64: string;
        };

        export type Encoded = Pick<
            Base,
            'base64'
            | 'name'
            | 'size'
            | 'type'
        >;

        export type Invalid = (
            Pick<Encoded, 'name' | 'size' | 'type'>
            & {
                reason: 'type' | 'size' | 'invalid';
            }
        );
    }
}