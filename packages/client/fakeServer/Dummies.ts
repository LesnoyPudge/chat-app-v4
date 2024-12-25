import { ClientEntities } from '@types';
import { inRange, invariant } from '@lesnoypudge/utils';
import { nanoid } from '@reduxjs/toolkit';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { v4 as uuid } from 'uuid';



export class Dummies {
    static channel(
        data: (
            Pick<
                ClientEntities.Channel.Base,
                'id'
                | 'textChat'
                | 'voiceChat'
                | 'roleWhitelist'
                | 'server'
                | 'name'
            >
        ),
    ): ClientEntities.Channel.Base {
        invariant(data.textChat ?? data.voiceChat, 'chat not provided');

        return {
            id: data.id,
            name: data.name,
            roleWhitelist: data.roleWhitelist,
            server: data.server,
            textChat: data.textChat,
            voiceChat: data.voiceChat,
        } as ClientEntities.Channel.Base;
    }

    static conversation(
        data: (
            Pick<
                ClientEntities.Conversation.Base,
                'id' | 'textChat' | 'voiceChat' | 'user'
            >
        ),
    ): ClientEntities.Conversation.Base {
        return {
            id: data.id,
            textChat: data.textChat,
            voiceChat: data.voiceChat,
            user: data.user,
        };
    }

    static message(
        data: (
            Pick<
                ClientEntities.Message.Base,
                'id' | 'attachments' | 'author' | 'index' | 'content'
            >
        ),
    ): ClientEntities.Message.Base {
        return {
            id: data.id,
            attachments: data.attachments,
            author: data.author,
            content: data.content,
            createdAt: Date.now(),
            index: data.index,
            isDeleted: false,
            isModified: false,
            updatedAt: Date.now(),
        };
    }

    static role(
        data: (
            Pick<
                ClientEntities.Role.Base,
                'id'
                | 'avatar'
                | 'color'
                | 'isDefault'
                | 'name'
                | 'server'
                | 'users'
            >
            & Partial<Pick<
                ClientEntities.Role.Base,
                'permissions'
            >>
        ),
    ): ClientEntities.Role.Base {
        return {
            id: data.id,
            avatar: data.avatar,
            color: data.color,
            isDefault: data.isDefault,
            name: data.name,
            permissions: data.permissions ?? {
                admin: false,
                banMember: false,
                channelControl: false,
                createInvitation: true,
                kickMember: false,
                serverControl: false,
            },
            server: data.server,
            users: [],
            weight: 0,
        };
    }

    static server(
        data: Pick<
            ClientEntities.Server.Base,
            'id'
            | 'avatar'
            | 'owner'
            | 'identifier'
            | 'name'
            | 'channels'
            | 'roles'
            | 'members'
        >,
    ): ClientEntities.Server.Base {
        return {
            id: data.id,
            avatar: data.avatar,
            banned: [],
            channels: [],
            identifier: data.identifier,
            invitations: [],
            isPrivate: false,
            members: [],
            name: data.name,
            owner: data.owner,
            roles: [],
            memberCount: 0,
            onlineMemberCount: 0,
        };
    }

    static user(
        data: Pick<
            ClientEntities.User.Base,
            'id'
            | 'login'
            | 'password'
            | 'name'
            | 'accessToken'
            | 'refreshToken'
        >,
    ): ClientEntities.User.Base {
        return {
            id: data.id,
            accessCode: nanoid(6).toUpperCase(),
            avatar: null,
            blocked: [],
            conversations: [],
            defaultAvatar: inRange(1, 4) as 1 | 2 | 3 | 4,
            extraStatus: 'default',
            friendRequests: {
                incoming: [],
                outgoing: [],
            },
            friends: [],
            hiddenConversations: [],
            isDeleted: false,
            lastSeenMessages: [],
            login: data.login,
            mutedTextChats: [],
            name: data.name,
            password: data.password,
            servers: [],
            settings: {
                messageDisplayMode: 'cozy',
                messageFontSize: 16,
                messageGroupSpacing: 20,
                theme: 'dark',
            },
            status: 'offline',
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        };
    }

    static textChatChannel(
        data: T.SetNonNullable<Pick<
            ClientEntities.TextChat.Base,
            'id' | 'channel'
        >>,
    ): ClientEntities.TextChat.Base {
        return {
            id: data.id,
            message: [],
            channel: data.channel,
            conversation: null,
        };
    }


    static textChatConversation(
        data: T.SetNonNullable<Pick<
            ClientEntities.TextChat.Base,
            'id' | 'conversation'
        >>,
    ): ClientEntities.TextChat.Base {
        return {
            id: data.id,
            message: [],
            channel: null,
            conversation: data.conversation,
        };
    }

    static voiceChatChannel(
        data: T.SetNonNullable<Pick<
            ClientEntities.TextChat.Base,
            'id' | 'channel'
        >>,
    ): ClientEntities.VoiceChat.Base {
        return {
            id: data.id,
            deafen: [],
            muted: [],
            participants: [],
            channel: data.channel,
            conversation: null,
        };
    }

    static voiceChatConversation(
        data: T.SetNonNullable<Pick<
            ClientEntities.VoiceChat.Base,
            'id' | 'conversation'
        >>,
    ): ClientEntities.VoiceChat.Base {
        return {
            id: data.id,
            channel: null,
            conversation: data.conversation,
            deafen: [],
            muted: [],
            participants: [],
        };
    }

    static file(
        data: ClientEntities.File.Encoded,
    ): ClientEntities.File.Base {
        return {
            id: uuid(),
            ...data,
        };
    }
}