import { T } from '@lesnoypudge/types-utils-base/namespace';



export namespace ClientEntities {
    export namespace User {
        export type Id = string;

        export type Base = {
            id: Id;
            login: string;
            password: string;
            name: string;
            defaultAvatar: 1 | 2 | 3 | 4;
            avatar: File.Id | null;
            settings: {
                theme: 'auto' | 'dark' | 'light';
                messageFontSize: 12 | 14 | 16 | 18 | 20;
                messageGroupSpacing: 16 | 20;
                messageDisplayMode: 'cozy' | 'compact';
            };
            status: 'online' | 'offline';
            extraStatus: 'default' | 'afk' | 'dnd' | 'invisible';
            accessCode: string;
            friends: Id[];
            blocked: Id[];
            servers: Server.Id[];
            conversations: Conversation.Id[];
            hiddenConversations: Conversation.Id[];
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
            mutedTextChats: TextChat.Id[];
            lastSeenMessages: {
                textChatId: TextChat.Id;
                lastIndex: number;
            }[];
            isDeleted: boolean;
        };
    }

    export namespace Message {
        export type Id = string;

        export type Base = {
            id: Id;
            index: number;
            author: User.Id;
            content: string;
            isModified: boolean;
            isDeleted: boolean;
            attachments: File.Id;
            createdAt: number;
            updatedAt: number;
        };
    }

    export namespace TextChat {
        export type Id = string;

        type Conditional = (
            {
                channel: Channel.Id;
                conversation?: never;
            }
            | {
                channel?: never;
                conversation: Conversation.Id;
            }
        );

        export type Base = T.Simplify<
            Conditional
            & {
                id: Id;
                message: Message.Id[];
            }
        >;
    }

    export namespace VoiceChat {
        export type Id = string;

        type Conditional = (
            {
                channel: Channel.Id;
                conversation?: never;
            }
            | {
                channel?: never;
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
            user: User.Id;
            textChat: TextChat.Id;
            voiceChat: VoiceChat.Id;
        };
    }

    export namespace Role {
        export type Id = string;

        export type Base = {
            id: Id;
            server: Server.Id;
            avatar: File.Id;
            name: string;
            color: string;
            isDefault: boolean;
            weight: number;
            users: User.Id[];
            permissions: {
                serverControl: boolean;
                channelControl: boolean;
                createInvitation: boolean;
                kickMember: boolean;
                banMember: boolean;
                admin: boolean;
            };
        };
    }

    export namespace Channel {
        export type Id = string;

        type Conditional = (
            {
                textChat: TextChat.Id;
                voiceChat?: never;
            }
            | {
                textChat?: never;
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
            members: User.Id;
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

        export type Encoded = {
            id: Id;
            name: string;
            size: number;
            type: string;
            base64: string;
        };
    }
}