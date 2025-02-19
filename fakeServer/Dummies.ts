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
            ...data,
        } as ClientEntities.Channel.Base;
    }

    static conversation(
        data: (
            Pick<
                ClientEntities.Conversation.Base,
                'id' | 'textChat' | 'voiceChat' | 'members'
            >
        ),
    ): ClientEntities.Conversation.Base {
        return {
            ...data,
        };
    }

    static message(
        data: (
            T.Except<
                ClientEntities.Message.Base,
                'createdAt'
                | 'isDeleted'
                | 'isModified'
                | 'updatedAt'
            >
        ),
    ): ClientEntities.Message.Base {
        return {
            ...data,
            createdAt: Date.now(),
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
            ...data,
            permissions: data.permissions ?? {
                admin: false,
                banMember: false,
                channelControl: false,
                createInvitation: true,
                kickMember: false,
                serverControl: false,
            },
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
            ...data,
            banned: [],
            invitations: [],
            isPrivate: false,
            onlineMemberCount: 0,
        };
    }

    static user(
        data: (
            Pick<
                ClientEntities.User.Base,
                'id'
                | 'login'
                | 'password'
                | 'name'
                | 'accessToken'
                | 'refreshToken'
            >
            & Partial<Pick<
                ClientEntities.User.Base,
                'status'
            >>
        ),
    ): ClientEntities.User.Base {
        return {
            ...data,
            accessCode: nanoid(6).toUpperCase(),
            avatar: null,
            blocked: [],
            conversations: [],
            defaultAvatar: inRange(1, 4) as 1 | 2 | 3 | 4,
            extraStatus: 'default',
            incomingFriendRequests: [],
            outgoingFriendRequests: [],
            friends: [],
            mutedConversations: [],
            hiddenConversations: [],
            isDeleted: false,
            lastSeenMessages: [],
            mutedServers: [],
            servers: [],
            settings: {
                messageDisplayMode: 'cozy',
                messageFontSize: 16,
                messageGroupSpacing: 20,
                theme: 'dark',
            },
            status: data.status ?? 'offline',
        };
    }

    static textChatChannel(
        data: T.SetNonNullable<Pick<
            ClientEntities.TextChat.Base,
            'id' | 'channel' | 'server'
        >> & Pick<ClientEntities.TextChat.Base, 'messages'>,
    ): ClientEntities.TextChat.Base {
        return {
            ...data,
            messageCount: data.messages.length,
            conversation: null,
        };
    }

    static textChatConversation(
        data: T.SetNonNullable<Pick<
            ClientEntities.TextChat.Base,
            'id' | 'conversation'
        >> & Pick<ClientEntities.TextChat.Base, 'messages'>,
    ): ClientEntities.TextChat.Base {
        return {
            ...data,
            server: null,
            messageCount: data.messages.length,
            channel: null,
        };
    }

    static voiceChatChannel(
        data: T.SetNonNullable<Pick<
            ClientEntities.TextChat.Base,
            'id' | 'channel' | 'server'
        >>,
    ): ClientEntities.VoiceChat.Base {
        return {
            ...data,
            deafen: [],
            muted: [],
            participants: [],
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
            ...data,
            server: null,
            channel: null,
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